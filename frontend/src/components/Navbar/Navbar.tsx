// frontend/src/components/Navbar/Navbar.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Group,
  Text,
  UnstyledButton,
  ThemeIcon,
  Box,
  rem,
} from "@mantine/core";
import { createStyles, Global } from "@mantine/emotion";
import {
  HiOutlineHome as IconHome,
  HiOutlineDocument as IconDocument,
  HiOutlineTemplate as IconTemplate,
  HiOutlineCog as IconSettings,
  HiOutlineLogout as IconLogout,
} from "react-icons/hi";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  link: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const mainNavItems = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/cv-builder", label: "CV Builder", icon: IconDocument },
  { link: "/templates", label: "Templates", icon: IconTemplate },
  { link: "/settings", label: "Settings", icon: IconSettings },
];

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  link: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({
  icon: Icon,
  label,
  link,
  active,
  onClick,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  return (
    <Link
      className={cx(classes.link, { [classes.linkActive]: active })}
      to={link}
      onClick={onClick}
    >
      <ThemeIcon
        variant={active ? "light" : "subtle"}
        color={active ? "blue" : "gray"}
        size={28}
      >
        <Icon size={18} />
      </ThemeIcon>
      <Box ml="md">{label}</Box>
    </Link>
  );
}

interface NavbarProps {
  opened: boolean;
  onClose?: () => void;
}

export function Navbar({ opened, onClose }: NavbarProps) {
  const { classes } = useStyles();
  const location = useLocation();

  const links = mainNavItems.map((item) => (
    <NavbarLink
      key={item.label}
      icon={item.icon}
      label={item.label}
      link={item.link}
      active={location.pathname === item.link}
      onClick={onClose}
    />
  ));

  return (
    <MantineNavbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 280 }}
      className={classes.navbar}
    >
      <MantineNavbar.Section className={classes.header}>
        <Group position="apart">
          <Text size="xl" weight={700} color="blue">
            CV Generator
          </Text>
        </Group>
      </MantineNavbar.Section>

      <MantineNavbar.Section
        grow
        className={classes.links}
        component={Box}
        px="md"
      >
        <div className={classes.linksInner}>{links}</div>
      </MantineNavbar.Section>

      <MantineNavbar.Section className={classes.footer}>
        <UnstyledButton className={classes.link}>
          <ThemeIcon color="red" variant="light" size={28}>
            <IconLogout size={18} />
          </ThemeIcon>
          <Box ml="md">Logout</Box>
        </UnstyledButton>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}

export default Navbar;
