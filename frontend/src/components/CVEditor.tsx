import { Tabs, Box, Text } from '@mantine/core';
import SelectionPanel from './SelectionPanel';
import TemplateSelector from './TemplateSelector';
import BrandingEditor from './BrandingEditor';

const CVEditor = ({
  cvData,
  selectedItems,
  setSelectedItems,
  selectedTemplate,
  setSelectedTemplate,
  branding,
  setBranding
}) => {
  return (
    <Tabs defaultValue="content">
      <Tabs.List>
        <Tabs.Tab value="content">Content</Tabs.Tab>
        <Tabs.Tab value="template">Template</Tabs.Tab>
        <Tabs.Tab value="branding">Branding</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="content" pt="xs">
        <SelectionPanel
          cvData={cvData}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </Tabs.Panel>

      <Tabs.Panel value="template" pt="xs">
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      </Tabs.Panel>

      <Tabs.Panel value="branding" pt="xs">
        <BrandingEditor
          branding={branding}
          setBranding={setBranding}
        />
      </Tabs.Panel>
    </Tabs>
  );
};

export default CVEditor;
