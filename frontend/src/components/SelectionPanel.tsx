import { Accordion, Checkbox, Stack, Text, Button, Group, TextInput } from '@mantine/core';
import { useState } from 'react';

const SelectionPanel = ({ cvData, selectedItems, setSelectedItems }) => {
  const [projectName, setProjectName] = useState('Default Project');

  const handleToggleItem = (section, id) => {
    setSelectedItems(prev => {
      if (prev[section].includes(id)) {
        return {
          ...prev,
          [section]: prev[section].filter(item => item !== id)
        };
      } else {
        return {
          ...prev,
          [section]: [...prev[section], id]
        };
      }
    });
  };

  const saveSelection = () => {
    // In a real app, this would save to backend
    alert(`Selection saved as "${projectName}"`);
  };

  return (
    <Stack spacing="md">
      <Group position="apart" mt="md" mb="md">
        <TextInput
          label="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button onClick={saveSelection} mt={24}>Save Selection</Button>
      </Group>

      <Accordion multiple defaultValue={['skills', 'experience', 'education']}>
        <Accordion.Item value="skills">
          <Accordion.Control>Skills</Accordion.Control>
          <Accordion.Panel>
            <Stack spacing="xs">
              {cvData.skills.map(skill => (
                <Checkbox
                  key={skill.id}
                  label={skill.name}
                  checked={selectedItems.skills.includes(skill.id)}
                  onChange={() => handleToggleItem('skills', skill.id)}
                />
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="experience">
          <Accordion.Control>Experience</Accordion.Control>
          <Accordion.Panel>
            <Stack spacing="xs">
              {cvData.experience.map(exp => (
                <Checkbox
                  key={exp.id}
                  label={`${exp.role} at ${exp.company}`}
                  checked={selectedItems.experience.includes(exp.id)}
                  onChange={() => handleToggleItem('experience', exp.id)}
                />
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="education">
          <Accordion.Control>Education</Accordion.Control>
          <Accordion.Panel>
            <Stack spacing="xs">
              {cvData.education.map(edu => (
                <Checkbox
                  key={edu.id}
                  label={`${edu.degree} at ${edu.institution}`}
                  checked={selectedItems.education.includes(edu.id)}
                  onChange={() => handleToggleItem('education', edu.id)}
                />
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="certifications">
          <Accordion.Control>Certifications</Accordion.Control>
          <Accordion.Panel>
            <Stack spacing="xs">
              {cvData.certifications.map(cert => (
                <Checkbox
                  key={cert.id}
                  label={cert.name}
                  checked={selectedItems.certifications.includes(cert.id)}
                  onChange={() => handleToggleItem('certifications', cert.id)}
                />
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="projects">
          <Accordion.Control>Projects</Accordion.Control>
          <Accordion.Panel>
            <Stack spacing="xs">
              {cvData.projects.map(proj => (
                <Checkbox
                  key={proj.id}
                  label={proj.name}
                  checked={selectedItems.projects.includes(proj.id)}
                  onChange={() => handleToggleItem('projects', proj.id)}
                />
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
};

export default SelectionPanel;
