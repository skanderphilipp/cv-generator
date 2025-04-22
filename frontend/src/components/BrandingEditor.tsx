import { Stack, ColorInput, Select, Text, FileInput, Button } from '@mantine/core';

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Playfair Display', label: 'Playfair Display' },
];

const BrandingEditor = ({ branding, setBranding }) => {
  return (
    <Stack spacing="md">
      <Text size="sm" weight={500}>Customize your CV branding</Text>

      <ColorInput
        label="Primary Color"
        value={branding.primaryColor}
        onChange={(value) => setBranding({...branding, primaryColor: value})}
        format="hex"
        swatches={['#0ea5e9', '#10b981', '#8b5cf6', '#ef4444', '#f59e0b']}
      />

      <ColorInput
        label="Secondary Color"
        value={branding.secondaryColor}
        onChange={(value) => setBranding({...branding, secondaryColor: value})}
        format="hex"
        swatches={['#64748b', '#475569', '#334155', '#1e293b', '#0f172a']}
      />

      <Select
        label="Font Family"
        data={fontOptions}
        value={branding.font}
        onChange={(value) => setBranding({...branding, font: value})}
      />

      <FileInput
        label="Company Logo"
        placeholder="Upload your logo"
        accept="image/png,image/jpeg,image/svg+xml"
        onChange={(file) => {
          if (file) {
            // In a real app, this would upload to a server
            // For now, we'll use object URL
            const logoUrl = URL.createObjectURL(file);
            setBranding({...branding, logo: logoUrl});
          }
        }}
      />

      <Button variant="outline" color="gray" mt="md">
        Reset to Default
      </Button>
    </Stack>
  );
};

export default BrandingEditor;
