// src/pages/TemplateManagement.tsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  Grid,
  Paper,
  Text,
  Button,
  Group,
  Modal,
  ActionIcon,
  Menu,
  Tooltip,
  Badge,
  SimpleGrid,
} from "@mantine/core";
import {
  RxTrash,
  RxDownload,
  RxCopy,
  RxPencil1,
  RxDotsVertical,
  RxUpload,
  RxPlus,
} from "react-icons/rx";
import TemplateEditor from "../components/TemplateEditor/TemplateEditor";
import TemplateManager from "../services/template/TemplateManager";

const templateManager = new TemplateManager();

const TemplateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState("");

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    const allTemplates = templateManager.getAllTemplates();
    setTemplates(allTemplates);
  };

  const handleCreateTemplate = () => {
    setCurrentTemplate(null);
    setShowEditor(true);
  };

  const handleEditTemplate = (template) => {
    setCurrentTemplate(template);
    setShowEditor(true);
  };

  const handleCloneTemplate = (template) => {
    try {
      templateManager.cloneTemplate(template.id);
      loadTemplates();
    } catch (error) {
      console.error("Error cloning template:", error);
    }
  };

  const handleDeleteClick = (template) => {
    setTemplateToDelete(template);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!templateToDelete) return;

    try {
      templateManager.deleteTemplate(templateToDelete.id);
      loadTemplates();
      setShowDeleteModal(false);
      setTemplateToDelete(null);
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const handleExportTemplate = (template) => {
    try {
      const templateJson = templateManager.exportTemplate(template.id);
      const blob = new Blob([templateJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${template.name.toLowerCase().replace(/\s+/g, "-")}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting template:", error);
    }
  };

  const handleImportSubmit = () => {
    try {
      templateManager.importTemplate(importData);
      loadTemplates();
      setShowImportModal(false);
      setImportData("");
    } catch (error) {
      console.error("Error importing template:", error);
    }
  };

  const handleSaveTemplate = (templateData) => {
    try {
      if (currentTemplate) {
        templateManager.updateTemplate(currentTemplate.id, templateData);
      } else {
        templateManager.createTemplate(templateData);
      }
      loadTemplates();
      setShowEditor(false);
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  return (
    <Container size="xl" py="xl">
      <Group position="apart" mb="xl">
        <Title order={1}>Template Management</Title>
        <Group>
          <Button
            variant="outline"
            leftIcon={<RxUpload size={16} />}
            onClick={() => setShowImportModal(true)}
          >
            Import Template
          </Button>
          <Button
            leftIcon={<RxPlus size={16} />}
            onClick={handleCreateTemplate}
          >
            Create Template
          </Button>
        </Group>
      </Group>

      <SimpleGrid cols={3} spacing="lg">
        {templates.map((template) => (
          <Paper key={template.id} withBorder p="md" radius="md">
            <Group position="apart" mb="xs">
              <Text weight={500} size="lg">
                {template.name}
              </Text>
              <Group spacing={0}>
                <Badge
                  color={template.type === "built-in" ? "blue" : "green"}
                  variant="light"
                  mr="sm"
                >
                  {template.type === "built-in" ? "Built-in" : "Custom"}
                </Badge>
                <Menu position="bottom-end" withinPortal>
                  <Menu.Target>
                    <ActionIcon>
                      <RxDotsVertical size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {template.type !== "built-in" && (
                      <Menu.Item
                        icon={<RxPencil1 size={16} />}
                        onClick={() => handleEditTemplate(template)}
                      >
                        Edit
                      </Menu.Item>
                    )}
                    <Menu.Item
                      icon={<RxCopy size={16} />}
                      onClick={() => handleCloneTemplate(template)}
                    >
                      Duplicate
                    </Menu.Item>
                    <Menu.Item
                      icon={<RxDownload size={16} />}
                      onClick={() => handleExportTemplate(template)}
                    >
                      Export
                    </Menu.Item>
                    {template.type !== "built-in" && (
                      <Menu.Item
                        icon={<RxTrash size={16} />}
                        color="red"
                        onClick={() => handleDeleteClick(template)}
                      >
                        Delete
                      </Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>

            <Text size="sm" color="dimmed" mb="md">
              {template.description || "No description provided"}
            </Text>

            <div
              style={{
                height: "120px",
                background: "#f1f5f9",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              {template.thumbnail ? (
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              ) : (
                <Text size="sm" color="dimmed">
                  Template Preview
                </Text>
              )}
            </div>

            <Button
              variant="light"
              fullWidth
              onClick={() => handleEditTemplate(template)}
            >
              {template.type === "built-in" ? "View Template" : "Edit Template"}
            </Button>
          </Paper>
        ))}
      </SimpleGrid>

      {/* Template Editor Modal */}
      <Modal
        opened={showEditor}
        onClose={() => setShowEditor(false)}
        title={
          currentTemplate
            ? `Edit Template: ${currentTemplate.name}`
            : "Create New Template"
        }
        size="xl"
        overflow="inside"
      >
        <TemplateEditor
          initialTemplate={currentTemplate}
          onSave={handleSaveTemplate}
          onClose={() => setShowEditor(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Template"
        size="sm"
      >
        <Text>
          Are you sure you want to delete the template "{templateToDelete?.name}
          "? This action cannot be undone.
        </Text>

        <Group position="right" mt="lg">
          <Button variant="default" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Group>
      </Modal>

      {/* Import Modal */}
      <Modal
        opened={showImportModal}
        onClose={() => setShowImportModal(false)}
        title="Import Template"
        size="md"
      >
        <Text mb="md">Paste the template JSON data below:</Text>

        <textarea
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
          style={{
            width: "100%",
            height: "200px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ced4da",
            fontFamily: "monospace",
            resize: "vertical",
          }}
        />

        <Group position="right" mt="lg">
          <Button variant="default" onClick={() => setShowImportModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleImportSubmit}>Import</Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default TemplateManagement;
