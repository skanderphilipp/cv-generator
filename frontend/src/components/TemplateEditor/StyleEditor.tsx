// src/components/TemplateEditor/StyleEditor.tsx
import {
  Box,
  Text,
  Group,
  Stack,
  ColorInput,
  Select,
  NumberInput,
  Divider,
  Grid,
} from "@mantine/core";

interface StyleEditorProps {
  styles: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    headingStyle: string;
    sectionSpacing: string;
    border: string;
  };
  onChange: (styles: any) => void;
}

const StyleEditor = ({ styles, onChange }: StyleEditorProps) => {
  const handleChange = (key: string, value: any) => {
    onChange({
      ...styles,
      [key]: value,
    });
  };

  const fontOptions = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Helvetica, sans-serif", label: "Helvetica" },
    { value: "Inter, sans-serif", label: "Inter" },
    { value: "Roboto, sans-serif", label: "Roboto" },
    { value: "Open Sans, sans-serif", label: "Open Sans" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Times New Roman, serif", label: "Times New Roman" },
    { value: "Courier New, monospace", label: "Courier New" },
  ];

  const headingStyleOptions = [
    { value: "normal", label: "Normal" },
    { value: "bold", label: "Bold" },
    { value: "light", label: "Light" },
    { value: "uppercase", label: "Uppercase" },
    { value: "underline", label: "Underlined" },
  ];

  const spacingOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  const borderOptions = [
    { value: "none", label: "None" },
    { value: "bottom", label: "Bottom Border" },
    { value: "all", label: "Full Border" },
  ];

  return (
    <Stack spacing="lg">
      <Text weight={500} size="lg">
        Visual Styling
      </Text>

      <Divider label="Typography" labelPosition="center" />

      <Grid>
        <Grid.Col span={6}>
          <Select
            label="Font Family"
            placeholder="Select a font"
            data={fontOptions}
            value={styles.fontFamily}
            onChange={(value) => handleChange("fontFamily", value)}
          />
        </Grid.Col>

        <Grid.Col span={3}>
          <Select
            label="Font Size"
            placeholder="Size"
            data={[
              { value: "0.875rem", label: "Small" },
              { value: "1rem", label: "Medium" },
              { value: "1.125rem", label: "Large" },
            ]}
            value={styles.fontSize}
            onChange={(value) => handleChange("fontSize", value)}
          />
        </Grid.Col>

        <Grid.Col span={3}>
          <Select
            label="Line Height"
            placeholder="Line spacing"
            data={[
              { value: "1.2", label: "Tight" },
              { value: "1.5", label: "Normal" },
              { value: "1.8", label: "Relaxed" },
            ]}
            value={styles.lineHeight}
            onChange={(value) => handleChange("lineHeight", value)}
          />
        </Grid.Col>
      </Grid>

      <Divider label="Colors" labelPosition="center" />

      <Grid>
        <Grid.Col span={6}>
          <ColorInput
            label="Primary Color"
            placeholder="Choose color"
            format="hex"
            swatches={["#0ea5e9", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b"]}
            value={styles.primaryColor}
            onChange={(value) => handleChange("primaryColor", value)}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <ColorInput
            label="Secondary Color"
            placeholder="Choose color"
            format="hex"
            swatches={["#64748b", "#475569", "#334155", "#1e293b", "#0f172a"]}
            value={styles.secondaryColor}
            onChange={(value) => handleChange("secondaryColor", value)}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <ColorInput
            label="Background Color"
            placeholder="Choose color"
            format="hex"
            swatches={["#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1"]}
            value={styles.backgroundColor}
            onChange={(value) => handleChange("backgroundColor", value)}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <ColorInput
            label="Text Color"
            placeholder="Choose color"
            format="hex"
            swatches={["#333333", "#1e293b", "#0f172a", "#64748b", "#94a3b8"]}
            value={styles.textColor}
            onChange={(value) => handleChange("textColor", value)}
          />
        </Grid.Col>
      </Grid>

      <Divider label="Layout" labelPosition="center" />

      <Grid>
        <Grid.Col span={4}>
          <Select
            label="Heading Style"
            placeholder="Style"
            data={headingStyleOptions}
            value={styles.headingStyle}
            onChange={(value) => handleChange("headingStyle", value)}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <Select
            label="Section Spacing"
            placeholder="Spacing"
            data={spacingOptions}
            value={styles.sectionSpacing}
            onChange={(value) => handleChange("sectionSpacing", value)}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <Select
            label="Section Borders"
            placeholder="Border style"
            data={borderOptions}
            value={styles.border}
            onChange={(value) => handleChange("border", value)}
          />
        </Grid.Col>
      </Grid>

      <Box
        sx={{
          padding: "1rem",
          border: "1px solid #e2e8f0",
          borderRadius: "4px",
          marginTop: "1rem",
          backgroundColor: "#f8fafc",
        }}
      >
        <Text size="sm" color="dimmed">
          Tip: For best results in PDF exports, use web-safe fonts and avoid
          extremely large font sizes or complex layouts.
        </Text>
      </Box>
    </Stack>
  );
};

export default StyleEditor;
