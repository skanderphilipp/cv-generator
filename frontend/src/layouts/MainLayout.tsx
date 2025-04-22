// frontend/src/layouts/MainLayout.tsx
import React from "react";
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  AppShell,
  Burger,
  Group,
  Text,
  UnstyledButton,
  ThemeIcon,
  Box,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  HiOutlineHome as IconHome,
  HiOutlineDocument as IconDocument,
  HiOutlineTemplate as IconTemplate,
  HiOutlineCog as IconSettings,
  HiOutlineLogout as IconLogout,
} from "react-icons/hi";

interface NavLinkProps {
  icon: React.FC<any>;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

const NavLink = ({ icon: Icon, label, to, active, onClick }: NavLinkProps) => {
  return (
    <Link
      to={to}
      style={{ textDecoration: "none", color: "inherit" }}
      onClick={onClick}
    >
      <UnstyledButton
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
            <Icon size={16} />
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
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header p="md">
        <Group position="apart">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text size="lg" weight={700} color="blue">
              CV Generator Pro
            </Text>
          </Group>
          <ThemeIcon color="blue" variant="filled" radius="xl">
            <IconSettings size={16} />
          </ThemeIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          <NavLink
            to="/"
            icon={IconHome}
            label="Home"
            active={isActive("/")}
            onClick={() => {
              if (window.innerWidth < 768) toggle();
            }}
          />
          <NavLink
            to="/cv-builder"
            icon={IconDocument}
            label="CV Builder"
            active={isActive("/cv-builder")}
            onClick={() => {
              if (window.innerWidth < 768) toggle();
            }}
          />
          <NavLink
            to="/templates"
            icon={IconTemplate}
            label="Templates"
            active={isActive("/templates")}
            onClick={() => {
              if (window.innerWidth < 768) toggle();
            }}
          />
          <NavLink
            to="/settings"
            icon={IconSettings}
            label="Settings"
            active={isActive("/settings")}
            onClick={() => {
              if (window.innerWidth < 768) toggle();
            }}
          />
        </AppShell.Section>

        <AppShell.Section>
          <Box
            sx={(theme) => ({
              paddingTop: theme.spacing.sm,
              borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
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
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[0],
        })}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
