// ============================================
// Card Detail API - Coordinates data loading for
// individual project/card detail pages
// ============================================
(function () {

class CardDetailAPI {
    constructor() {
        this.projectsAPI = window.ProjectsAPI;
        this.mediaAPI = window.MediaAPI;
        this.reviewsAPI = window.ReviewsAPI;
        this.categoriesAPI = window.CategoriesAPI;
        this.techStacksAPI = window.TechStacksAPI;
        this.generationsAPI = window.GenerationsAPI;
    }

    /**
     * Load a project by either slug or UUID
     * @param {string} identifier - UUID or slug
     */
    async loadProject(identifier) {
        try {
            // Check if it's a UUID (36 chars with hyphens) or slug
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
            return isUuid
                ? await this.projectsAPI.getProjectByUuid(identifier)
                : await this.projectsAPI.getProjectBySlug(identifier);
        } catch (error) {
            console.error('Load project failed:', error.message);
            throw error;
        }
    }

    /**
     * Load complete project data with related info
     * @param {string} identifier - UUID or slug of project
     * @returns {Promise<object>} - Complete project data
     */
    async loadCompleteProjectData(identifier) {
        try {
            const project = await this.loadProject(identifier);
            if (!project) return null;

            // The API already embeds full category/tech-stack/owner objects
            // directly on the project (categories, tech_stacks, owner), so no
            // extra lookups are needed for those. Reviews need a separate call,
            // and the project's embedded generation is just {uuid, gen} -- the
            // course name only comes back from GET /generations/{uuid}.
            const genUuid = project.generation && project.generation.uuid;
            const [reviews, fullGeneration] = await Promise.all([
                project.uuid ? this.reviewsAPI.getReviewsByProject(project.uuid).catch(() => []) : [],
                genUuid && this.generationsAPI ? this.generationsAPI.getGenerationByUuid(genUuid).catch(() => null) : null,
            ]);

            const categories = Array.isArray(project.categories) ? project.categories : [];

            return {
                ...project,
                reviews: reviews || [],
                categories,
                category: categories[0] || null, // convenience: first category, for single-category UI
                techStacks: Array.isArray(project.tech_stacks) ? project.tech_stacks : [],
                owner: project.owner || null,
                course: (fullGeneration && fullGeneration.course) || null,
                thumbnailUrl: this.mediaAPI.getMediaUrl(project.thumbnail),
                imageUrl: this.mediaAPI.getMediaUrl(project.thumbnail)
            };
        } catch (error) {
            console.error('Load complete project data failed:', error.message);
            throw error;
        }
    }

    /**
     * Load multiple tech stacks by UUIDs
     */
    async _loadTechStacks(techStackUuids) {
        if (!techStackUuids || !techStackUuids.length) return [];
        try {
            const promises = techStackUuids.map(uuid =>
                this.techStacksAPI.getTechStackByUuid(uuid).catch(() => null)
            );
            const results = await Promise.all(promises);
            return results.filter(ts => ts !== null);
        } catch (error) {
            console.error('Load tech stacks failed:', error.message);
            return [];
        }
    }

    /**
     * Render project cards into a container
     * @param {Array} projects - Array of project data
     * @param {HTMLElement} container - Container element
     * @param {Function} cardTemplate - Template function returning HTML
     */
    renderProjectCards(projects, container, cardTemplate) {
        if (!container || !Array.isArray(projects)) return;

        if (projects.length === 0) {
            container.innerHTML = '<div class="text-center text-gray-500 py-8">No projects found</div>';
            return;
        }

        const html = projects.map(project => {
            const template = typeof cardTemplate === 'function' 
                ? cardTemplate(project)
                : this._defaultCardTemplate(project);
            return template;
        }).join('');

        container.innerHTML = html;
    }

    /**
     * Default card template for projects -- the shared look used everywhere
     * a plain project grid is rendered without a page-specific template
     * (search results, category filters, etc.), so results always match the
     * rest of the site instead of a one-off style. showLoading()'s skeleton
     * mirrors this exact shape.
     */
    _defaultCardTemplate(project) {
        const thumbUrl = this.mediaAPI.getMediaUrl(project.thumbnail);
        // Relative path so it works both when served from a web root and when
        // opened directly from the filesystem (file://). project-detail.html lives
        // in the same folder as the pages that render these cards.
        const projectUrl = `project-detail.html?id=${project.uuid || project.slug}`;
        const category = Array.isArray(project.categories) && project.categories[0]
            ? (project.categories[0].title || project.categories[0].name)
            : null;

        return `
            <div class="group h-full w-full max-w-xs cursor-pointer" onclick="window.location.href='${projectUrl}'">
                <div class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                    <div class="relative overflow-hidden bg-gray-100 h-32">
                        ${thumbUrl ? `<img src="${thumbUrl}"
                            alt="${this._escapeHtml(project.title || 'Project')}"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onerror="this.style.display='none'"/>` : ''}
                    </div>
                    <div class="p-3 flex-1 flex flex-col">
                        ${category ? `<span class="inline-block self-start mb-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full bg-secondary2/10 text-secondary2">${this._escapeHtml(category)}</span>` : ''}
                        <h3 class="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">${this._escapeHtml(project.title || 'Untitled')}</h3>
                        <p class="text-xs text-gray-500 line-clamp-2 flex-1">${this._escapeHtml(project.description || project.short_description || '')}</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Show a skeleton-card loading state (shaped like _defaultCardTemplate)
     * instead of a bare spinner, so the grid doesn't jump/reflow once the
     * real cards arrive. Used for both initial loads and search/filter
     * refreshes across every page that lists projects.
     * @param {HTMLElement} container - Container element
     * @param {number} count - How many placeholder cards to render
     */
    showLoading(container, count = 6) {
        if (!container) return;
        const skeletonCard = `
            <div class="w-full max-w-xs animate-pulse">
                <div class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col">
                    <div class="bg-gray-200 h-32"></div>
                    <div class="p-3 flex-1 flex flex-col gap-2">
                        <div class="h-3.5 w-16 bg-gray-200 rounded-full"></div>
                        <div class="h-4 bg-gray-200 rounded w-3/4 mt-0.5"></div>
                        <div class="h-3 bg-gray-200 rounded w-full"></div>
                        <div class="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = skeletonCard.repeat(count);
    }

    /**
     * Show error state
     * @param {HTMLElement} container - Container element
     * @param {string} message - Error message
     */
    showError(container, message = 'Failed to load data. Please try again.') {
        if (container) {
            container.innerHTML = `<div class="text-center text-red-500 py-8">${this._escapeHtml(message)}</div>`;
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    _escapeHtml(str) {
        return window.ApiUtils ? window.ApiUtils.escapeHTML(str) : '';
    }
}

const cardDetailAPI = new CardDetailAPI();
window.CardDetailAPI = cardDetailAPI;
// Also exposed as a global lowercase binding: every page's inline script calls
// the bare `cardDetailAPI.xxx()` form directly (not `window.CardDetailAPI`).
window.cardDetailAPI = cardDetailAPI;

})();
