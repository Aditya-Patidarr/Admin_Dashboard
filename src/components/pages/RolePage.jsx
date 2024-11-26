import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaSearch, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import EditRoleModal from "../Modal/EditModal/EditRoleModal";
import AddRole from "../Modal/AddModal/AddRoleModal";
import { roles as importedRoles } from "../../Api/MockDatas";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const RolePage = () => {
  const rowsPerPage = 5;
  const headings = [
    { key: "Id", value: "ID" },
    { key: "rolename", value: "Role" },
    { key: "description", value: "Description" },
    { key: "permission", value: "Permission" },
    { key: "action", value: "Actions" },
  ];

  const [roles, setRoles] = useState(importedRoles);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("rolename");
  const [filter, setFilter] = useState({ role: "" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "Id", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const getFilteredRoles = () => {
    return roles
      .filter((role) => {
        if (searchCategory === "rolename") {
          return (
            role.rolename
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            role.description
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())
          );
        }
        return role[searchCategory]
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      })
      .filter((role) => {
        return filter.role ? role.rolename === filter.role : true;
      })
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  };

  const filteredRoles = getFilteredRoles();
  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(filteredRoles.length / rowsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prevRows) =>
      prevRows.includes(id)
        ? prevRows.filter((rowId) => rowId !== id)
        : [...prevRows, id]
    );
  };

  const toggleSelectAll = (event) => {
    setSelectedRows(event.target.checked ? roles.map((role) => role.Id) : []);
  };

  const handleEdit = (id) => {
    const roleToEdit = roles.find((role) => role.Id === id);
    setSelectedRole(roleToEdit);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete role with ID ${id}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setRoles(roles.filter((role) => role.Id !== id));
        toast.success(`Role with ID ${id} deleted successfully`, {
          position: "top-right",
        });
      }
    });
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) {
      toast.error("No roles selected for deletion", { position: "top-right" });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedRows.length} role(s). This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete them!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setRoles(roles.filter((role) => !selectedRows.includes(role.Id)));
        toast.success(`${selectedRows.length} role(s) deleted successfully`, {
          position: "top-right",
        });
        setSelectedRows([]);
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-lg shadow-md mt-6 p-6 sm:p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Role Table</h1>

          {/* Filters & Actions */}
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="relative flex gap-5">
              <input
                type="text"
                className="p-2 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <select
                className="p-1 border rounded-lg w-36 sm:w-52 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={filter.role}
                onChange={(e) => setFilter({ ...filter, role: e.target.value })}
              >
                <option value="">Filter by Role</option>
                {roles.map((role) => (
                  <option key={role.Id} value={role.rolename}>
                    {role.rolename}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <AddRole />
              <button
                className="flex items-center gap-2 bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition-colors duration-300"
                onClick={handleBulkDelete}
              >
                <FaTrash /> Delete Selected
              </button>
            </div>
          </div>

          <div className="overflow-x-auto shadow border rounded-lg">
            <table className="table-auto w-full text-left  text-sm text-gray-900">
              <thead className="bg-gray-100 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">
                    <input type="checkbox" onChange={toggleSelectAll} />
                  </th>
                  {headings.map((heading) => (
                    <th
                      key={heading.key}
                      className="px-6 py-3 font-semibold text-gray-700 cursor-pointer"
                      onClick={() => handleSort(heading.key)}
                    >
                      {heading.value}
                      {sortConfig.key === heading.key &&
                        (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedRoles.map((role) => (
                  <tr key={role.Id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(role.Id)}
                        onChange={() => toggleRowSelection(role.Id)}
                      />
                    </td>
                    <td className="px-6 py-4">{role.Id}</td>
                    <td className="px-6 py-4">{role.rolename}</td>
                    <td className="px-6 py-4">{role.description}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-5 border rounded">
                        {Object.entries(role.permissions)
                          .filter(([, isActive]) => isActive)
                          .map(([permission]) => (
                            <div
                              key={permission}
                              className="flex items-center space-x-2 pl-3"
                            >
                              <input
                                type="checkbox"
                                checked
                                disabled
                                className="h-4 w-4"
                              />
                              <label className="text-sm">
                                {permission.toUpperCase()}
                              </label>
                            </div>
                          ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 flex gap-5">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEdit(role.Id)}
                      >
                        <FaEdit size={23} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(role.Id)}
                      >
                        <FaTrash size={23} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-lg ${
                    i + 1 === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Edit Modal */}
          {isEditModalOpen && (
            <EditRoleModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              roleData={selectedRole}
              updateRole={(updatedRole) => {
                setRoles(
                  roles.map((role) =>
                    role.Id === updatedRole.Id ? updatedRole : role
                  )
                );
              }}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RolePage;
