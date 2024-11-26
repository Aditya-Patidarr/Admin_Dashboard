import image1 from '../assets/images/user1.jpg';
import image2 from '../assets/images/user2.jpg';
import image3 from '../assets/images/user3.jpg';
import image4 from '../assets/images/user4.jpg';
import image5 from '../assets/images/user5.jpg';


export const users = [
  {
    userId: 1,
    username: "alex",
    role: "Admin",
    status: "Active",
    created: "2024-01-01",
    image:
      image1,
      // "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    userId: 2,
    username: "harry",
    role: "User",
    status: "Inactive",
    created: "2024-02-15",
    image: image2,
  },
  {
    userId: 3,
    username: "daisy",
    role: "User",
    status: "Active",
    created: "2024-03-12",
    image:
     image3,
  },
  {
    userId: 4,
    username: "sam",
    role: "Manager",
    status: "Inactive",
    created: "2024-04-05",
    image: image4,
  },
  {
    userId: 5,
    username: "hailey",
    role: "Admin",
    status: "Inactive",
    created: "2024-05-20",
    image:
      image5,
  },
  {
    userId: 6,
    username: "ron",
    role: "Manager",
    status: "Active",
    created: "2024-06-10",
    image:
      image2,
  },
];

export const roles = [
  {
    Id: 1,
    rolename: "Admin",
    description:
      "Has full access to all resources and can manage all users and data.",
    permissions: {
      read: true,
      write: true,
      delete: true,
      manageRoles: true,
      viewAnalytics: true,
    },
  },
  {
    Id: 2,
    rolename: "User",
    description:
      "Can read and write their own data, but cannot modify others' data.",
    permissions: {
      read: true,
      write: false,
      delete: false,
      manageRoles: false,
      viewAnalytics: true,
    },
  },
  {
    Id: 3,
    rolename: "Manager",
    description:
      "Can manage users, assign roles, and view reports, but cannot delete data.",
    permissions: {
      read: true,
      write: true,
      delete: false,
      manageRoles: false,
      viewAnalytics: true,
    },
  },
  {
    Id: 4,
    rolename: "Guest",
    description:
      "Has limited access to view content but cannot make changes or access sensitive data.",
    permissions: {
      read: true,
      write: true,
      delete: false,
      manageRoles: false,
      viewAnalytics: false,
    },
  },
  {
    Id: 5,
    rolename: "Moderator",
    description:
      "Can moderate user-generated content and manage user activities.",
    permissions: {
      read: true,
      write: true,
      delete: false,
      manageRoles: true,
      viewAnalytics: false,
    },
  },
  {
    Id: 6,
    rolename: "Super Admin",
    description:
      "Has the highest level of access, can perform any action across the platform, including system-level management.",
    permissions: {
      read: true,
      write: true,
      delete: false,
      manageRoles: false,
      viewAnalytics: false,
    },
  },
];

export const permissions = [
  {
    id: 1,
    permission: "Read",
    description: "Allows reading of data",
  },
  {
    id: 2,
    permission: "Write",
    description: "Allows writing of data",
  },
  {
    id: 3,
    permission: "Execute",
    description: "Allows execution of operations",
  },
  {
    id: 4,
    permission: "Delete",
    description: "Allows deletion of records",
  },
  {
    id: 5,
    permission: "Admin",
    description: "Full administrative permissions",
  },
  {
    id: 6,
    permission: "View Reports",
    description: "Permission to view reports",
  },
];
