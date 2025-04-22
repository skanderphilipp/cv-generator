// src/components/TemplateEditor/TemplateEditor.tsx
import { useState, useEffect } from "react";
import {
  Tabs,
  Box,
  Text,
  Button,
  TextInput,
  Textarea,
  ColorInput,
  Select,
  Group,
  Stack,
  Modal,
  Paper,
  Accordion,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconPlus,
  IconTrash,
  IconCopy,
  IconCode,
  IconDownload,
  IconUpload,
} from "react-icons/hi";
import SectionEditor from "./SectionEditor";
import StyleEditor from "./StyleEditor";
import TemplatePreview from "./TemplatePreview";

interface TemplateEditorProps {
  onSave: (template: any) => void;
  onClose: () => void;
  initialTemplate?: any;
}

const TemplateEditor = ({
  onSave,
  onClose,
  initialTemplate,
}: TemplateEditorProps) => {
  const [activeTab, setActiveTab] = useState("info");
  const [previewData, setPreviewData] = useState(null);
  const [cssCode, setCssCode] = useState("");
  const [htmlStructure, setHtmlStructure] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeModalTab, setCodeModalTab] = useState("html");

  const form = useForm({
    initialValues: initialTemplate
      ? {
          ...initialTemplate,
        }
      : {
          name: "",
          description: "",
          sections: [
            { id: "header", name: "Header", enabled: true, order: 0 },
            { id: "summary", name: "Summary", enabled: true, order: 1 },
            { id: "skills", name: "Skills", enabled: true, order: 2 },
            { id: "experience", name: "Experience", enabled: true, order: 3 },
            { id: "education", name: "Education", enabled: true, order: 4 },
            { id: "projects", name: "Projects", enabled: true, order: 5 },
            {
              id: "certifications",
              name: "Certifications",
              enabled: true,
              order: 6,
            },
            { id: "languages", name: "Languages", enabled: true, order: 7 },
          ],
          styles: {
            fontFamily: "Inter, sans-serif",
            fontSize: "1rem",
            lineHeight: "1.5",
            primaryColor: "#0ea5e9",
            secondaryColor: "#64748b",
            backgroundColor: "#ffffff",
            textColor: "#333333",
            headingStyle: "normal",
            sectionSpacing: "medium",
            border: "none",
          },
        },
  });

  // Load mock data for preview
  useEffect(() => {
    // In a real app, this would come from an API or state
    import("../../data/mocks/cv.json").then((data) =>
      setPreviewData(data.default)
    );
  }, []);

  // Generate CSS and HTML code based on form values
  useEffect(() => {
    const { styles } = form.values;

    // Generate CSS
    const css = `
/* Template: ${form.values.name} */
.cv-container {
  font-family: ${styles.fontFamily};
  font-size: ${styles.fontSize};
  line-height: ${styles.lineHeight};
  color: ${styles.textColor};
  background-color: ${styles.backgroundColor};
  max-width: 210mm;
  margin: 0 auto;
  padding: 20mm;
}

.cv-section {
  margin-bottom: ${
    styles.sectionSpacing === "small"
      ? "1rem"
      : styles.sectionSpacing === "medium"
        ? "2rem"
        : "3rem"
  };
  ${styles.border === "bottom" ? `border-bottom: 1px solid ${styles.secondaryColor}` : ""}
}

.cv-section-title {
  color: ${styles.primaryColor};
  margin-bottom: 1rem;
  font-weight: ${
    styles.headingStyle === "bold"
      ? "700"
      : styles.headingStyle === "light"
        ? "300"
        : "500"
  };
  ${styles.headingStyle === "uppercase" ? "text-transform: uppercase;" : ""}
  ${styles.headingStyle === "underline" ? `border-bottom: 2px solid ${styles.primaryColor};` : ""}
}

/* Add more generated styles based on form values */
`;

    // Generate HTML structure
    const html = `
<div class="cv-container">
  ${form.values.sections
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order)
    .map(
      (section) => `
  <!-- ${section.name} Section -->
  <div class="cv-section cv-${section.id}">
    <h2 class="cv-section-title">${section.name}</h2>
    <div class="cv-section-content">
      <!-- Content will be dynamically populated based on data -->
    </div>
  </div>`
    )
    .join("\n")}
</div>
`;

    setCssCode(css);
    setHtmlStructure(html);
  }, [form.values]);

  const handleSave = () => {
    onSave({
      ...form.values,
      cssCode,
      htmlStructure,
    });
  };

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="info">Basic Info</Tabs.Tab>
          <Tabs.Tab value="sections">Sections</Tabs.Tab>
          <Tabs.Tab value="styles">Styling</Tabs.Tab>
          <Tabs.Tab value="preview">Preview</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="info" pt="md">
          <Stack spacing="md">
            <TextInput
              label="Template Name"
              placeholder="e.g., Modern Professional"
              required
              {...form.getInputProps("name")}
            />

            <Textarea
              label="Description"
              placeholder="Describe your template..."
              minRows={3}
              {...form.getInputProps("description")}
            />

            <Group position="right" mt="md">
              <Button variant="outline" onClick={() => setShowCodeModal(true)}>
                View Code
              </Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="sections" pt="md">
          <SectionEditor
            sections={form.values.sections}
            onChange={(sections) => form.setFieldValue("sections", sections)}
          />
        </Tabs.Panel>

        <Tabs.Panel value="styles" pt="md">
          <StyleEditor
            styles={form.values.styles}
            onChange={(styles) => form.setFieldValue("styles", styles)}
          />
        </Tabs.Panel>

        <Tabs.Panel value="preview" pt="md">
          {previewData ? (
            <TemplatePreview
              template={form.values}
              data={previewData}
              cssCode={cssCode}
              htmlStructure={htmlStructure}
            />
          ) : (
            <Text>Loading preview data...</Text>
          )}
        </Tabs.Panel>
      </Tabs>

      <Group position="right" mt="xl">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Template</Button>
      </Group>

      {/* Code Modal */}
      <Modal
        opened={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        title="Template Code"
        size="lg"
      >
        <Tabs value={codeModalTab} onTabChange={setCodeModalTab}>
          <Tabs.List>
            <Tabs.Tab value="html">HTML Structure</Tabs.Tab>
            <Tabs.Tab value="css">CSS Styles</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="html" pt="md">
            <Paper
              withBorder
              p="md"
              sx={{
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
              {htmlStructure}
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="css" pt="md">
            <Paper
              withBorder
              p="md"
              sx={{
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
              {cssCode}
            </Paper>
          </Tabs.Panel>
        </Tabs>

        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setShowCodeModal(false)}>
            Close
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};

export default TemplateEditor;
