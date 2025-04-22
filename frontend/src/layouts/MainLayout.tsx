// src/layouts/MainLayout.tsx
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  AppShell,
  Header,
  Text,
  Group,
  Navbar,
  UnstyledButton,
  ThemeIcon,
  Box,
  Burger,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";
import {
  IconHome,
  IconDocument,
  IconTemplate,
  IconSettings,
  IconLogout,
} from "react-icons/hi";

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

const NavLink = ({ icon, label, to, active, onClick }: NavLinkProps) => {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <UnstyledButton
        onClick={onClick}
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: active ? theme.colors.blue[7] : theme.colors.gray[7],
          backgroundColor: active ? theme.colors.blue[0] : "transparent",
          "&:hover": {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon
            color={active ? "blue" : "gray"}
            variant={active ? "light" : "subtle"}
          >
            {icon}
          </ThemeIcon>
          <Text size="sm" weight={500}>
            {label}
          </Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};

const MainLayout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 250 }}
        >
          <Navbar.Section>
            <Box
              sx={(theme) => ({
                paddingBottom: theme.spacing.xs,
                marginBottom: theme.spacing.md,
                borderBottom: `1px solid ${theme.colors.gray[2]}`,
              })}
            >
              <Text size="xl" weight={700} color="blue">
                CV Generator
              </Text>
            </Box>
          </Navbar.Section>

          <Navbar.Section grow>
            <NavLink
              to="/"
              icon={<IconHome size={16} />}
              label="Home"
              active={isActive("/")}
              onClick={() => setOpened(false)}
            />
            <NavLink
              to="/cv-builder"
              icon={<IconDocument size={16} />}
              label="CV Builder"
              active={isActive("/cv-builder")}
              onClick={() => setOpened(false)}
            />
            <NavLink
              to="/templates"
              icon={<IconTemplate size={16} />}
              label="Templates"
              active={isActive("/templates")}
              onClick={() => setOpened(false)}
            />
          </Navbar.Section>

          <Navbar.Section>
            <Box
              sx={(theme) => ({
                paddingTop: theme.spacing.sm,
                borderTop: `1px solid ${theme.colors.gray[2]}`,
              })}
            >
              <UnstyledButton
                sx={(theme) => ({
                  display: "block",
                  width: "100%",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color: theme.colors.gray[7],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[0],
                  },
                })}
              >
                <Group>
                  <ThemeIcon color="red" variant="light">
                    <IconLogout size={16} />
                  </ThemeIcon>
                  <Text size="sm">Logout</Text>
                </Group>
              </UnstyledButton>
            </Box>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header
          height={60}
          p="xs"
          sx={{ backgroundColor: theme.colors.blue[6] }}
        >
          <Group position="apart">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color="white"
                mr="xl"
              />
            </MediaQuery>
            <Text size="xl" weight={700} color="white">
              CV Generator Pro
            </Text>
            <Group>
              <ThemeIcon color="blue" variant="filled" radius="xl">
                <IconSettings size={16} />
              </ThemeIcon>
            </Group>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
};

export default MainLayout;
