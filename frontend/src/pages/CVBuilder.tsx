import { useState } from 'react';
import { Grid, Paper, Title } from '@mantine/core';
import CVEditor from '../components/CVEditor';
import CVPreview from '../components/CVPreview';
import mockData from '../data/mocks/cv.json';

const CVBuilder = () => {
  const [cvData, setCvData] = useState(mockData);
  const [selectedItems, setSelectedItems] = useState({
    skills: mockData.skills.map(skill => skill.id),
    experience: mockData.experience.map(exp => exp.id),
    education: mockData.education.map(edu => edu.id),
    certifications: mockData.certifications.map(cert => cert.id),
    projects: mockData.projects.map(proj => proj.id),
    languages: mockData.languages.map(lang => lang.id)
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [branding, setBranding] = useState({
    primaryColor: '#0ea5e9',
    secondaryColor: '#64748b',
    font: 'Inter',
    logo: null
  });

  return (
    <Grid gutter="md" p="md">
      <Grid.Col span={5}>
        <Paper shadow="xs" p="md" withBorder>
          <Title order={2} mb="md">CV Editor</Title>
          <CVEditor
            cvData={cvData}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            branding={branding}
            setBranding={setBranding}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col span={7}>
        <Paper shadow="xs" p="md" withBorder>
          <Title order={2} mb="md">Preview</Title>
          <CVPreview
            cvData={cvData}
            selectedItems={selectedItems}
            template={selectedTemplate}
            branding={branding}
          />
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default CVBuilder;
