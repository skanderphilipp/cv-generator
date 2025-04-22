// src/pages/HomePage.tsx
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Paper,
  SimpleGrid,
  ThemeIcon,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { LuPrinter, LuHouse } from "react-icons/lu";
import { RiAmazonFill } from "react-icons/ri";
import { RxFile, RxMagicWand } from "react-icons/rx";
import React from "react";

const HomePage = () => {
  return (
    <Container size="lg">
      <div
        style={{ textAlign: "center", marginBottom: "3rem", marginTop: "2rem" }}
      >
        <Title order={1} mb="sm">
          Professional CV Generator
        </Title>
        <Text size="xl" color="dimmed" mb="xl">
          Create stunning, tailored CVs for every job application
        </Text>

        <Group position="center">
          <Button
            component={Link}
            to="/cv-builder"
            size="lg"
            leftIcon={<RxFile size={18} />}
          >
            Start Building
          </Button>
          <Button
            component={Link}
            to="/templates"
            variant="outline"
            size="lg"
            leftIcon={<LuHouse size={18} />}
          >
            Browse Templates
          </Button>
        </Group>
      </div>

      <SimpleGrid
        cols={3}
        spacing="xl"
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "sm", cols: 1, spacing: "sm" },
        ]}
        mb="xl"
      >
        <Paper withBorder p="lg" radius="md">
          <ThemeIcon size="xl" radius="md" variant="light" color="blue" mb="md">
            <RxMagicWand size={24} />
          </ThemeIcon>
          <Title order={3} mb="xs">
            AI Selection
          </Title>
          <Text color="dimmed">
            Our AI automatically selects the most relevant skills and experience
            for each job application.
          </Text>
        </Paper>

        <Paper withBorder p="lg" radius="md">
          <ThemeIcon
            size="xl"
            radius="md"
            variant="light"
            color="green"
            mb="md"
          >
            <LuHouse size={24} />
          </ThemeIcon>
          <Title order={3} mb="xs">
            Custom Templates
          </Title>
          <Text color="dimmed">
            Choose from professional templates or create your own with our
            intuitive template editor.
          </Text>
        </Paper>

        <Paper withBorder p="lg" radius="md">
          <ThemeIcon
            size="xl"
            radius="md"
            variant="light"
            color="violet"
            mb="md"
          >
            <LuPrinter size={24} />
          </ThemeIcon>
          <Title order={3} mb="xs">
            High-Quality PDFs
          </Title>
          <Text color="dimmed">
            Generate perfectly formatted professional PDFs ready to impress
            recruiters.
          </Text>
        </Paper>
      </SimpleGrid>

      <Paper withBorder p="xl" radius="md" mb="xl">
        <SimpleGrid
          cols={2}
          spacing="xl"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <div>
            <Title order={2} mb="md">
              Why Use Our CV Generator?
            </Title>
            <Text mb="lg">
              In today's competitive job market, having a tailored CV for each
              application dramatically increases your chances of landing
              interviews. Our platform helps recruitment agencies create
              perfectly customized CVs for each candidate and job posting.
            </Text>

            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>
                <Text mb="xs">
                  <b>Save time</b> - Create multiple versions of a CV in
                  minutes, not hours
                </Text>
              </li>
              <li>
                <Text mb="xs">
                  <b>Consistency</b> - Maintain brand identity while customizing
                  content
                </Text>
              </li>
              <li>
                <Text mb="xs">
                  <b>Higher success rate</b> - Tailored CVs result in more
                  interview invitations
                </Text>
              </li>
              <li>
                <Text mb="xs">
                  <b>Professional results</b> - Beautiful, ATS-friendly
                  documents every time
                </Text>
              </li>
            </ul>
          </div>

          <div
            style={{
              background: "#f1f5f9",
              borderRadius: "8px",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <ThemeIcon size={80} radius={40} mb="md">
              <LuHouse size={40} />
            </ThemeIcon>
            <Title order={3} mb="xs">
              Ready to get started?
            </Title>
            <Text mb="lg">Create your first customized CV in minutes.</Text>
            <Button component={Link} to="/cv-builder" size="lg" fullWidth>
              Build Your CV Now
            </Button>
          </div>
        </SimpleGrid>
      </Paper>

      <Paper withBorder p="xl" radius="md" sx={{ background: "#eef6ff" }}>
        <Title order={2} align="center" mb="xl">
          How It Works
        </Title>

        <SimpleGrid
          cols={4}
          spacing="md"
          breakpoints={[
            { maxWidth: "md", cols: 2 },
            { maxWidth: "xs", cols: 1 },
          ]}
        >
          <div style={{ textAlign: "center" }}>
            <ThemeIcon size="xl" radius="xl" mb="md">
              1
            </ThemeIcon>
            <Title order={4} mb="xs">
              Upload Data
            </Title>
            <Text size="sm">Import structured CV data from your database</Text>
          </div>

          <div style={{ textAlign: "center" }}>
            <ThemeIcon size="xl" radius="xl" mb="md">
              2
            </ThemeIcon>
            <Title order={4} mb="xs">
              Select Components
            </Title>
            <Text size="sm">
              Choose relevant skills and experience for the job
            </Text>
          </div>

          <div style={{ textAlign: "center" }}>
            <ThemeIcon size="xl" radius="xl" mb="md">
              3
            </ThemeIcon>
            <Title order={4} mb="xs">
              Apply Template
            </Title>
            <Text size="sm">Select a template and customize branding</Text>
          </div>

          <div style={{ textAlign: "center" }}>
            <ThemeIcon size="xl" radius="xl" mb="md">
              4
            </ThemeIcon>
            <Title order={4} mb="xs">
              Generate PDF
            </Title>
            <Text size="sm">Create and download professional CVs</Text>
          </div>
        </SimpleGrid>
      </Paper>

      <div style={{ textAlign: "center", margin: "3rem 0" }}>
        <Text color="dimmed" mb="xs">
          Trusted by recruitment agencies worldwide
        </Text>
        <Group position="center" spacing="xl">
          <Text weight={700} size="xl" color="gray">
            ACME Recruiting
          </Text>
          <Text weight={700} size="xl" color="gray">
            TalentSphere
          </Text>
          <Text weight={700} size="xl" color="gray">
            StaffPro
          </Text>
        </Group>
      </div>
    </Container>
  );
};

export default HomePage;
