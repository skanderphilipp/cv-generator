import { SimpleGrid, Paper, Radio, Text, Image, Stack } from '@mantine/core';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, modern design with sidebar for skills and contact info'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional CV layout with header and section formatting'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple, minimalist design focusing on content'
  }
];

const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  return (
    <Radio.Group
      value={selectedTemplate}
      onChange={setSelectedTemplate}
      name="template"
    >
      <SimpleGrid cols={1} spacing="md">
        {templates.map(template => (
          <Paper key={template.id} withBorder p="md" sx={{
            cursor: 'pointer',
            border: selectedTemplate === template.id ? '2px solid var(--primary-color)' : undefined
          }}>
            <Radio value={template.id} label={null} />
            <Stack spacing="xs">
              <Text weight={500}>{template.name}</Text>
              <Text size="sm" color="dimmed">{template.description}</Text>
              <div
                style={{
                  height: '100px',
                  background: '#f1f5f9',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text size="sm" color="dimmed">Template Preview</Text>
              </div>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Radio.Group>
  );
};

export default TemplateSelector;
