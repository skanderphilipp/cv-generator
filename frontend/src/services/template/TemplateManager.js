// src/services/template/TemplateManager.js
import { nanoid } from "nanoid";

/**
 * TemplateManager Service
 * Handles the management of CV templates including storage, retrieval,
 * and customization of templates.
 */
class TemplateManager {
  constructor(storage) {
    this.storage = storage || localStorage;
    this.TEMPLATES_KEY = "cv_generator_templates";
    this.DEFAULT_TEMPLATES = [
      {
        id: "modern",
        name: "Modern",
        description:
          "Clean, modern design with sidebar for skills and contact info",
        type: "built-in",
        thumbnail: "/templates/modern-thumb.png",
      },
      {
        id: "classic",
        name: "Classic",
        description: "Traditional CV layout with header and section formatting",
        type: "built-in",
        thumbnail: "/templates/classic-thumb.png",
      },
      {
        id: "minimal",
        name: "Minimal",
        description: "Simple, minimalist design focusing on content",
        type: "built-in",
        thumbnail: "/templates/minimal-thumb.png",
      },
    ];
  }

  /**
   * Initialize the template store
   */
  init() {
    if (!this.storage.getItem(this.TEMPLATES_KEY)) {
      this.storage.setItem(
        this.TEMPLATES_KEY,
        JSON.stringify(this.DEFAULT_TEMPLATES)
      );
    }
  }

  /**
   * Get all available templates
   * @returns {Array} Array of template objects
   */
  getAllTemplates() {
    this.init();
    return JSON.parse(this.storage.getItem(this.TEMPLATES_KEY));
  }

  /**
   * Get a template by ID
   * @param {string} id Template ID
   * @returns {Object} Template object
   */
  getTemplate(id) {
    const templates = this.getAllTemplates();
    return templates.find((template) => template.id === id);
  }

  /**
   * Create a new custom template
   * @param {Object} templateData Template data
   * @returns {Object} Newly created template
   */
  createTemplate(templateData) {
    const templates = this.getAllTemplates();
    const newTemplate = {
      id: nanoid(),
      type: "custom",
      ...templateData,
      createdAt: new Date().toISOString(),
    };

    templates.push(newTemplate);
    this.storage.setItem(this.TEMPLATES_KEY, JSON.stringify(templates));
    return newTemplate;
  }

  /**
   * Update an existing template
   * @param {string} id Template ID
   * @param {Object} templateData Template data
   * @returns {Object} Updated template
   */
  updateTemplate(id, templateData) {
    const templates = this.getAllTemplates();
    const index = templates.findIndex((template) => template.id === id);

    if (index === -1) {
      throw new Error(`Template with ID ${id} not found`);
    }

    if (templates[index].type === "built-in") {
      throw new Error("Cannot modify built-in templates");
    }

    const updatedTemplate = {
      ...templates[index],
      ...templateData,
      updatedAt: new Date().toISOString(),
    };

    templates[index] = updatedTemplate;
    this.storage.setItem(this.TEMPLATES_KEY, JSON.stringify(templates));
    return updatedTemplate;
  }

  /**
   * Delete a custom template
   * @param {string} id Template ID
   * @returns {boolean} Success status
   */
  deleteTemplate(id) {
    const templates = this.getAllTemplates();
    const template = templates.find((t) => t.id === id);

    if (!template) {
      throw new Error(`Template with ID ${id} not found`);
    }

    if (template.type === "built-in") {
      throw new Error("Cannot delete built-in templates");
    }

    const filteredTemplates = templates.filter((t) => t.id !== id);
    this.storage.setItem(this.TEMPLATES_KEY, JSON.stringify(filteredTemplates));
    return true;
  }

  /**
   * Clone an existing template as a new custom template
   * @param {string} id Template ID to clone
   * @param {string} newName New name for the cloned template
   * @returns {Object} Newly cloned template
   */
  cloneTemplate(id, newName) {
    const template = this.getTemplate(id);

    if (!template) {
      throw new Error(`Template with ID ${id} not found`);
    }

    const { id: originalId, createdAt, updatedAt, ...templateData } = template;
    return this.createTemplate({
      ...templateData,
      name: newName || `Copy of ${template.name}`,
      clonedFrom: id,
    });
  }

  /**
   * Export a template to JSON
   * @param {string} id Template ID
   * @returns {string} JSON string of the template
   */
  exportTemplate(id) {
    const template = this.getTemplate(id);

    if (!template) {
      throw new Error(`Template with ID ${id} not found`);
    }

    return JSON.stringify(template);
  }

  /**
   * Import a template from JSON
   * @param {string} jsonString JSON string of the template
   * @returns {Object} Imported template
   */
  importTemplate(jsonString) {
    try {
      const templateData = JSON.parse(jsonString);
      // Validate that it has the basic template structure
      if (!templateData.name) {
        throw new Error("Invalid template format");
      }

      return this.createTemplate({
        ...templateData,
        id: undefined, // Generate a new ID
        type: "custom", // Always mark as custom
        imported: true,
      });
    } catch (error) {
      throw new Error(`Failed to import template: ${error.message}`);
    }
  }
}

export default TemplateManager;
