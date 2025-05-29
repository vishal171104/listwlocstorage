import './index.css';
import { useState, useEffect } from 'react';
import {Logo } from "./components/Logo/Logo";
import { type ReactNode } from 'react';
import { Table } from './components/Table/Table';
import { Button } from './components/Button/Button';
import Spinner from './components/Loaderx/Spinner';
import { EditDeleteActions } from './components/Edit/EditDeleteActions';

type ActiveTable = 'users' | 'products' | 'orders' | null;

// Local storage keys
const STORAGE_KEYS = {
  users: 'tableData_users',
  products: 'tableData_products',
  orders: 'tableData_orders'
};

// Initial data sets (fallback if no localStorage data)
const initialUsers = [
  [1, "John Mitchell", "john.mitchell@company.com", "Admin", "Active"],
  [2, "Sarah Johnson", "sarah.johnson@techcorp.com", "Manager", "Active"],
  [3, "Michael Davis", "michael.davis@startup.io", "User", "Inactive"],
  [4, "Emily Chen", "emily.chen@designco.com", "Editor", "Active"],
  [5, "Robert Wilson", "robert.wilson@enterprise.com", "User", "Active"],
  [6, "Jessica Brown", "jessica.brown@agency.com", "Manager", "Active"],
  [7, "David Lee", "david.lee@freelance.com", "User", "Inactive"],
  [8, "Amanda Taylor", "amanda.taylor@consulting.com", "Editor", "Active"],
  [9, "Christopher Moore", "chris.moore@solutions.com", "Admin", "Active"],
  [10, "Lisa Anderson", "lisa.anderson@services.com", "User", "Active"],
  [11, "James Thomas", "james.thomas@platform.com", "Manager", "Inactive"],
  [12, "Maria Garcia", "maria.garcia@systems.com", "Editor", "Active"],
  [13, "Daniel Rodriguez", "daniel.rodriguez@digital.com", "User", "Active"],
  [14, "Jennifer Martinez", "jennifer.martinez@cloud.com", "Admin", "Active"],
  [15, "Matthew Thompson", "matthew.thompson@mobile.com", "Manager", "Active"],
  [16, "Ashley White", "ashley.white@webapp.com", "User", "Inactive"],
  [17, "Kevin Harris", "kevin.harris@datatech.com", "Editor", "Active"],
  [18, "Nicole Clark", "nicole.clark@innovation.com", "User", "Active"],
  [19, "Brandon Lewis", "brandon.lewis@future.com", "Manager", "Active"],
  [20, "Stephanie Walker", "stephanie.walker@growth.com", "Admin", "Active"],
  [21, "Ryan Hall", "ryan.hall@scale.com", "User", "Inactive"],
  [22, "Melissa Young", "melissa.young@connect.com", "Editor", "Active"],
  [23, "Justin King", "justin.king@network.com", "User", "Active"],
  [24, "Rachel Wright", "rachel.wright@bridge.com", "Manager", "Active"],
  [25, "Tyler Scott", "tyler.scott@nexus.com", "Admin", "Active"]
];

const initialProducts = [
  [1, "MacBook Pro 16-inch M3", "Electronics", "2499.00", 45],
  [2, "iPhone 15 Pro Max", "Electronics", "1199.00", 78],
  [3, "Herman Miller Aeron Chair", "Furniture", "1395.00", 23],
  [4, "Dell XPS 13 Laptop", "Electronics", "1299.00", 67],
  [5, "Standing Desk Adjustable", "Furniture", "699.00", 34],
  [6, "Sony WH-1000XM5 Headphones", "Electronics", "399.00", 89],
  [7, "Ergonomic Office Chair", "Furniture", "449.00", 56],
  [8, "iPad Pro 12.9-inch", "Electronics", "1099.00", 42],
  [9, "IKEA Bekant Desk", "Furniture", "179.00", 91],
  [10, "Samsung Galaxy S24 Ultra", "Electronics", "1299.00", 38],
  [11, "Steelcase Leap V2 Chair", "Furniture", "926.00", 19],
  [12, "Microsoft Surface Pro 9", "Electronics", "999.00", 55],
  [13, "L-Shaped Gaming Desk", "Furniture", "299.00", 72],
  [14, "AirPods Pro 2nd Gen", "Electronics", "249.00", 134],
  [15, "Executive Leather Chair", "Furniture", "649.00", 28],
  [16, "Google Pixel 8 Pro", "Electronics", "999.00", 41],
  [17, "Conference Table 8-Seater", "Furniture", "1299.00", 12],
  [18, "Apple Watch Series 9", "Electronics", "399.00", 86],
  [19, "Modular Sofa Set", "Furniture", "1899.00", 15],
  [20, "Mechanical Keyboard RGB", "Electronics", "159.00", 103],
  [21, "Bookshelf 5-Tier Wood", "Furniture", "249.00", 67],
  [22, "Wireless Mouse Pro", "Electronics", "79.00", 145],
  [23, "Coffee Table Modern", "Furniture", "399.00", 31],
  [24, "4K Monitor 32-inch", "Electronics", "549.00", 29],
  [25, "Dining Table Set 6-Chair", "Furniture", "899.00", 8]
];

const initialOrders = [
  [10001, "John Mitchell", "MacBook Pro 16-inch M3", 1, "2499.00", "2024-01-15"],
  [10002, "Sarah Johnson", "iPhone 15 Pro Max", 2, "2398.00", "2024-01-16"],
  [10003, "Michael Davis", "Herman Miller Aeron Chair", 1, "1395.00", "2024-01-17"],
  [10004, "Emily Chen", "Standing Desk Adjustable", 1, "699.00", "2024-01-18"],
  [10005, "Robert Wilson", "Sony WH-1000XM5 Headphones", 1, "399.00", "2024-01-19"],
  [10006, "Jessica Brown", "iPad Pro 12.9-inch", 3, "3297.00", "2024-01-20"],
  [10007, "David Lee", "Dell XPS 13 Laptop", 1, "1299.00", "2024-01-21"],
  [10008, "Amanda Taylor", "Ergonomic Office Chair", 2, "898.00", "2024-01-22"],
  [10009, "Christopher Moore", "AirPods Pro 2nd Gen", 4, "996.00", "2024-01-23"],
  [10010, "Lisa Anderson", "IKEA Bekant Desk", 1, "179.00", "2024-01-24"],
  [10011, "James Thomas", "Samsung Galaxy S24 Ultra", 1, "1299.00", "2024-01-25"],
  [10012, "Maria Garcia", "Microsoft Surface Pro 9", 1, "999.00", "2024-01-26"],
  [10013, "Daniel Rodriguez", "L-Shaped Gaming Desk", 1, "299.00", "2024-01-27"],
  [10014, "Jennifer Martinez", "Apple Watch Series 9", 2, "798.00", "2024-01-28"],
  [10015, "Matthew Thompson", "Executive Leather Chair", 1, "649.00", "2024-01-29"],
  [10016, "Ashley White", "Google Pixel 8 Pro", 1, "999.00", "2024-01-30"],
  [10017, "Kevin Harris", "Mechanical Keyboard RGB", 3, "477.00", "2024-02-01"],
  [10018, "Nicole Clark", "Conference Table 8-Seater", 1, "1299.00", "2024-02-02"],
  [10019, "Brandon Lewis", "Modular Sofa Set", 1, "1899.00", "2024-02-03"],
  [10020, "Stephanie Walker", "4K Monitor 32-inch", 2, "1098.00", "2024-02-04"],
  [10021, "Ryan Hall", "Wireless Mouse Pro", 5, "395.00", "2024-02-05"],
  [10022, "Melissa Young", "Bookshelf 5-Tier Wood", 2, "498.00", "2024-02-06"],
  [10023, "Justin King", "Coffee Table Modern", 1, "399.00", "2024-02-07"],
  [10024, "Rachel Wright", "Steelcase Leap V2 Chair", 1, "926.00", "2024-02-08"],
  [10025, "Tyler Scott", "Dining Table Set 6-Chair", 1, "899.00", "2024-02-09"]
];

// Helper functions for localStorage
const loadFromStorage = (key: string, fallback: unknown[][]) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return fallback;
  }
};

const saveToStorage = (key: string, data: unknown[][]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Auto-reindex function to renumber IDs sequentially starting from 1
const reindexData = (data: unknown[][]) => {
  return data.map((row, index) => [
    index + 1, // New sequential ID starting from 1
    ...row.slice(1) // Keep all other columns unchanged
  ]);
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTable, setActiveTable] = useState<ActiveTable>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  // Initialize state with localStorage data or fallback to initial data
  const [users, setUsers] = useState(() => loadFromStorage(STORAGE_KEYS.users, initialUsers));
  const [products, setProducts] = useState(() => loadFromStorage(STORAGE_KEYS.products, initialProducts));
  const [orders, setOrders] = useState(() => loadFromStorage(STORAGE_KEYS.orders, initialOrders));

  // Editing state
  const [editingRow, setEditingRow] = useState<{table: ActiveTable, rowId: number} | null>(null);
  const [editValues, setEditValues] = useState<{[key: number]: string}>({});

  // Define which columns are editable for each table
  const getEditableColumns = (table: ActiveTable) => {
    switch (table) {
      case 'users':
        return [1, 2, 3, 4]; // Name, Email, Role, Status
      case 'products':
        return [1, 2, 3, 4]; // Product Name, Category, Price, Stock
      case 'orders':
        return [1, 2, 3, 4, 5]; // Customer, Product, Quantity, Total, Date
      default:
        return [];
    }
  };

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.users, users);
  }, [users]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.products, products);
  }, [products]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.orders, orders);
  }, [orders]);

  const usersHeaders = ["ID", "Name", "Email", "Role", "Status"];
  const productsHeaders = ["ID", "Product Name", "Category", "Price ($)", "Stock"];
  const ordersHeaders = ["Order ID", "Customer", "Product", "Quantity", "Total ($)", "Date"];

  const getCurrentData = () => {
    let data: unknown[][] = [];
    switch (activeTable) {
      case 'users':
        data = users;
        break;
      case 'products':
        data = products;
        break;
      case 'orders':
        data = orders;
        break;
      default:
        return [];
    }
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    switch (activeTable) {
      case 'users':
        return Math.ceil(users.length/rowsPerPage);
      case 'products':
        return Math.ceil(products.length/rowsPerPage);
      case 'orders':
        return Math.ceil(orders.length/rowsPerPage);
      default:
        return 0;
    }
  };

  const handleTableChange = (table: ActiveTable) => {
    setIsLoading(true);
    setEditingRow(null); // Clear any active editing
    setEditValues({});
    setTimeout(() => {
      setActiveTable(table);
      setCurrentPage(1);
      setIsLoading(false);
    }, 500);
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setEditingRow(null); // Clear any active editing
    setEditValues({});
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 500);
  };

  // Enhanced delete function with auto-reindexing
  const handleDelete = (table: ActiveTable, id: number) => {
    if (!table) return;
    setIsLoading(true);
    setTimeout(() => {
      if (table === 'users') {
        const filteredUsers = users.filter((user: number[]) => user[0] !== id);
        const reindexedUsers = reindexData(filteredUsers);
        setUsers(reindexedUsers);
      } else if (table === 'products') {
        const filteredProducts = products.filter((product: number[]) => product[0] !== id);
        const reindexedProducts = reindexData(filteredProducts);
        setProducts(reindexedProducts);
      } else if (table === 'orders') {
        const filteredOrders = orders.filter((order: number[]) => order[0] !== id);
        const reindexedOrders = reindexData(filteredOrders);
        setOrders(reindexedOrders);
      }
      setIsLoading(false);
      const lastPage = getTotalPages();
      if (currentPage > lastPage && lastPage > 0) {
        setCurrentPage(lastPage);
      }
    }, 500);
  };

  // Start editing a row - populate all editable values
  const handleEdit = (table: ActiveTable, rowId: number) => {
    if (!table) return;
    
    // Find the row in the current data
    let tableData: unknown[][] = [];
    switch (table) {
      case 'users':
        tableData = users;
        break;
      case 'products':
        tableData = products;
        break;
      case 'orders':
        tableData = orders;
        break;
    }
    
    const row = tableData.find(row => row[0] === rowId);
    if (!row) return;
    
    const editableColumns = getEditableColumns(table);
    const initialValues: {[key: number]: string} = {};
    
    editableColumns.forEach(colIndex => {
      initialValues[colIndex] = String(row[colIndex]);
    });
    
    setEditingRow({ table, rowId });
    setEditValues(initialValues);
  };

  const handleSaveEdit = () => {
    if (!editingRow) return;
    
    const { table, rowId } = editingRow;
    
    // Find the row index
    let tableData: unknown[][] = [];
    let setTableData: (data: unknown[][]) => void;
    
    switch (table) {
      case 'users':
        tableData = users;
        setTableData = setUsers;
        break;
      case 'products':
        tableData = products;
        setTableData = setProducts;
        break;
      case 'orders':
        tableData = orders;
        setTableData = setOrders;
        break;
      default:
        return;
    }
    
    const rowIndex = tableData.findIndex(row => row[0] === rowId);
    if (rowIndex === -1) return;
    
    const newTableData = [...tableData];
    const editableColumns = getEditableColumns(table);
    
    // Update all edited values
    editableColumns.forEach(colIndex => {
      if (editValues[colIndex] !== undefined) {
        newTableData[rowIndex][colIndex] = editValues[colIndex];
      }
    });
    
    setTableData(newTableData);
    setEditingRow(null);
    setEditValues({});
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditValues({});
  };

  const handleEditValueChange = (colIndex: number, value: string) => {
    setEditValues(prev => ({
      ...prev,
      [colIndex]: value
    }));
  };

  const dataWithActions = () => {
    const currentData = getCurrentData();
    if (!activeTable) return [];
    
    const editableColumns = getEditableColumns(activeTable);
    
    return currentData.map((row) => {
      const id = row[0] as number;
      const isEditingThisRow = editingRow?.table === activeTable && editingRow?.rowId === id;
      
      const processedRow = row.map((cell, cellIndex) => {
        // Show inline editor for editable columns when this row is being edited
        if (isEditingThisRow && editableColumns.includes(cellIndex)) {
          return (
            <div key={`edit-${cellIndex}`} className="flex items-center space-x-2">
              <input
                type="text"
                value={editValues[cellIndex] || ''}
                onChange={(e) => handleEditValueChange(cellIndex, e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm min-w-0 flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
              />
            </div>
          );
        }
        
        // Show normal cell content
        return <span key={`cell-${cellIndex}`}>{cell as ReactNode}</span>;
      });
      
      // Show Save/Cancel buttons instead of Edit/Delete when editing
      if (isEditingThisRow) {
        return [
          ...processedRow,
          <div key={`edit-actions-${id}`} className="flex items-center space-x-2">
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ];
      }
      
      // Show normal Edit/Delete actions
      return [
        ...processedRow,
        <EditDeleteActions
          key={`actions-${id}`}
          onEdit={() => handleEdit(activeTable, id)}
          onDelete={() => handleDelete(activeTable, id)}
        />
      ];
    });
  };

  const renderPagination = () => {
    if (!activeTable) return null;
    const totalPages = getTotalPages();
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return (
      <div className="flex items-center justify-between mt-6 px-4">
        <div className="text-sm text-gray-600">
          Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, getCurrentTotalRows())} of {getCurrentTotalRows()} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1"
          >
            Previous
          </Button>
          {pages.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "primary" : "secondary"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 ${
                currentPage === page
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1"
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  const getCurrentTotalRows = () => {
    switch (activeTable) {
      case 'users':
        return users.length;
      case 'products':
        return products.length;
      case 'orders':
        return orders.length;
      default:
        return 0;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-indigo-600 text-white p-6 flex flex-col space-y-6 shadow-lg">
        <div>
          <Logo className="text-white"></Logo>
        </div>
        <Button
          variant={activeTable === 'users' ? 'secondary' : 'secondary'}
          size="lg"
          onClick={() => handleTableChange('users')}
          className={`w-full font-semibold transition
            ${activeTable === 'users'
              ? 'bg-white text-indigo-500 hover:bg-gray-200'
              : 'bg-indigo-500 hover:bg-indigo-700 text-white'}`}
        >
          Users
        </Button>
        <Button
          variant={activeTable === 'products' ? 'secondary' : 'secondary'}
          size="lg"
          onClick={() => handleTableChange('products')}
          className={`w-full font-semibold transition
            ${activeTable === 'products'
              ? 'bg-white text-indigo-500 hover:bg-gray-200'
              : 'bg-indigo-500 hover:bg-indigo-700 text-white'}`}
        >
          Products
        </Button>
        <Button
          variant={activeTable === 'orders' ? 'secondary' : 'secondary'}
          size="lg"
          onClick={() => handleTableChange('orders')}
          className={`w-full font-semibold transition
            ${activeTable === 'orders'
              ? 'bg-white text-indigo-600 hover:bg-gray-200'
              : 'bg-indigo-500 hover:bg-indigo-700 text-white'}`}
        >
          Orders
        </Button>
      </aside>
      
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-transparent z-50">
          <Spinner isLoading={true} />
        </div>
      ) : (
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTable === 'users' && (
            <>
              <Table
                headers={usersHeaders}
                data={dataWithActions() as ReactNode[][]}
                striped
                hover
                size="md"
              />
              {renderPagination()}
            </>
          )}
          {activeTable === 'products' && (
            <>
              <Table
                headers={productsHeaders}
                data={dataWithActions() as ReactNode[][]}
                striped
                hover
                size="md"
              />
              {renderPagination()}
            </>
          )}
          {activeTable === 'orders' && (
            <>
              <Table
                headers={ordersHeaders}
                data={dataWithActions() as ReactNode[][]}
                striped
                hover
                size="md"
              />
              {renderPagination()}
            </>
          )}
          {!activeTable && (
            <p className="text-gray-500">Select a table from the left sidebar to display data.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;