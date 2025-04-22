// src/components/TemplateEditor/SectionEditor.tsx
import { useState } from "react";
import {
  Box,
  Text,
  Switch,
  TextInput,
  Group,
  Stack,
  Paper,
  Button,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconGripVertical, IconPlus, IconTrash } from "react-icons/hi";

interface Section {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  customFields?: any;
}

interface SectionEditorProps {
  sections: Section[];
  onChange: (sections: Section[]) => void;
}

const SectionEditor = ({ sections, onChange }: SectionEditorProps) => {
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    onChange(updatedItems);
  };

  const handleToggleSection = (id) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, enabled: !section.enabled } : section
    );
    onChange(updatedSections);
  };

  const handleAddSection = () => {
    if (!newSectionName.trim()) return;

    const newId = `custom-${Date.now()}`;
    const newSection = {
      id: newId,
      name: newSectionName,
      enabled: true,
      order: sections.length,
      custom: true,
    };

    onChange([...sections, newSection]);
    setNewSectionName("");
    setShowAddSection(false);
  };

  const handleDeleteSection = (id) => {
    // Only allow deletion of custom sections
    const sectionToDelete = sections.find((section) => section.id === id);
    if (!sectionToDelete?.custom) return;

    const updatedSections = sections
      .filter((section) => section.id !== id)
      .map((section, index) => ({
        ...section,
        order: index,
      }));

    onChange(updatedSections);
  };

  return (
    <Box>
      <Text mb="md">
        Drag and drop sections to reorder, toggle to enable/disable
      </Text>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections
                .sort((a, b) => a.order - b.order)
                .map((section, index) => (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(provided) => (
                      <Paper
                        withBorder
                        p="md"
                        mb="md"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <Group position="apart">
                          <Group>
                            <div {...provided.dragHandleProps}>
                              <IconGripVertical size={20} />
                            </div>
                            <Text>{section.name}</Text>
                          </Group>

                          <Group>
                            <Switch
                              checked={section.enabled}
                              onChange={() => handleToggleSection(section.id)}
                            />

                            {section.custom && (
                              <ActionIcon
                                color="red"
                                variant="subtle"
                                onClick={() => handleDeleteSection(section.id)}
                              >
                                <IconTrash size={16} />
                              </ActionIcon>
                            )}
                          </Group>
                        </Group>
                      </Paper>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {showAddSection ? (
        <Paper withBorder p="md" mt="lg">
          <Stack>
            <TextInput
              label="Section Name"
              placeholder="e.g., Volunteer Work"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />

            <Group position="right">
              <Button
                variant="default"
                onClick={() => setShowAddSection(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddSection}>Add Section</Button>
            </Group>
          </Stack>
        </Paper>
      ) : (
        <Button
          variant="outline"
          leftIcon={<IconPlus size={16} />}
          onClick={() => setShowAddSection(true)}
          mt="lg"
        >
          Add Custom Section
        </Button>
      )}
    </Box>
  );
};

export default SectionEditor;
