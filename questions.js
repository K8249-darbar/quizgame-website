const SUBJECT_QUESTIONS = {
  "Data Structures and Algorithms": [
    {
      question: "Which data structure follows the Last In First Out principle?",
      options: ["Queue", "Stack", "Linked List", "Heap"],
      answer: 1,
      explanation: "A Stack stores elements in a Last-In, First-Out (LIFO) order."
    },
    {
      question: "What is the average time complexity of binary search on a sorted array?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: 1,
      explanation: "Binary search divides the search interval in half each step, giving O(log n) time."
    },
    {
      question: "Which traversal gives sorted output in a Binary Search Tree?",
      options: ["Preorder", "Postorder", "Level order", "Inorder"],
      answer: 3,
      explanation: "Inorder traversal visits left subtree, root, then right subtree, producing values in ascending order."
    },
    {
      question: "Which sorting algorithm is stable by default?",
      options: ["Selection sort", "Heap sort", "Merge sort", "Quick sort"],
      answer: 2,
      explanation: "Merge sort preserves the relative order of equal elements, making it stable."
    },
    {
      question: "In a min-heap, the value at the root node is:",
      options: [
        "Always the median",
        "Always the maximum",
        "Always the minimum",
        "Undefined"
      ],
      answer: 2,
      explanation: "Min-heap property requires the parent to be less than or equal to its children, placing the minimum element at the root."
    },
    {
      question: "Which data structure is typically used for BFS in a graph?",
      options: ["Stack", "Queue", "Priority queue", "Hash table"],
      answer: 1,
      explanation: "Breadth-First Search uses a FIFO Queue to visit neighbor nodes layer by layer."
    }
  ],
  "Database Management Systems": [
    {
      question: "Which SQL command is used to remove a table and its structure?",
      options: ["DELETE", "REMOVE", "TRUNCATE", "DROP"],
      answer: 3,
      explanation: "DROP TABLE removes the table definition as well as all data, indexes, and triggers."
    },
    {
      question: "Which normal form removes transitive dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: 2,
      explanation: "3NF requires a table to be in 2NF and have no transitive functional dependencies."
    },
    {
      question: "Which key uniquely identifies each row in a table?",
      options: ["Candidate key", "Primary key", "Foreign key", "Composite key"],
      answer: 1,
      explanation: "A Primary Key uniquely identifies every record in a database table."
    },
    {
      question: "Which SQL clause is used to filter grouped results?",
      options: ["WHERE", "ORDER BY", "HAVING", "GROUP FILTER"],
      answer: 2,
      explanation: "HAVING filters records created by GROUP BY, whereas WHERE filters individual rows before grouping."
    },
    {
      question: "ACID property that ensures all operations in a transaction happen or none happen is:",
      options: ["Consistency", "Isolation", "Durability", "Atomicity"],
      answer: 3,
      explanation: "Atomicity guarantees that all statements in a transaction complete successfully or are rolled back."
    },
    {
      question: "A foreign key is used to:",
      options: [
        "Store file data",
        "Link related tables",
        "Encrypt rows",
        "Create indexes only"
      ],
      answer: 1,
      explanation: "Foreign keys enforce referential integrity by linking columns in one table to the primary key of another table."
    }
  ],
  "Operating Systems": [
    {
      question: "Which scheduling algorithm can cause starvation of low-priority processes?",
      options: [
        "First Come First Serve",
        "Round Robin",
        "Priority Scheduling",
        "Shortest Job First with aging"
      ],
      answer: 2,
      explanation: "Preemptive or non-preemptive Priority Scheduling can leave low priority processes indefinitely waiting."
    },
    {
      question: "A deadlock can occur when processes hold and wait for resources due to:",
      options: [
        "Mutual exclusion",
        "Preemption",
        "Time slicing",
        "Spooling"
      ],
      answer: 0,
      explanation: "Mutual exclusion is one of Coffman's four necessary conditions for deadlock."
    },
    {
      question: "Virtual memory primarily allows:",
      options: [
        "Faster CPU clock speed",
        "Execution of bigger programs than physical RAM",
        "Eliminating cache memory",
        "No need for secondary storage"
      ],
      answer: 1,
      explanation: "Virtual memory maps virtual memory addresses to physical RAM or secondary disk storage."
    },
    {
      question: "Which component of OS manages files and directories?",
      options: ["Process manager", "Memory manager", "File system", "Shell only"],
      answer: 2,
      explanation: "The file system manages directory structures, storage allocation, and file access."
    },
    {
      question: "In paging, logical memory is divided into:",
      options: ["Segments", "Frames", "Pages", "Blocks"],
      answer: 2,
      explanation: "Logical memory is divided into fixed-size Pages, mapped to physical RAM Frames."
    },
    {
      question: "Context switching means:",
      options: [
        "Changing user password",
        "Saving and loading process state",
        "Moving files between disks",
        "Restarting the operating system"
      ],
      answer: 1,
      explanation: "Context switching involves saving the CPU register and memory state of a running process so another can run."
    }
  ],
  "Computer Networks": [
    {
      question: "Which layer of the OSI model handles routing?",
      options: ["Data Link", "Network", "Transport", "Session"],
      answer: 1,
      explanation: "The Network Layer (Layer 3) handles packet routing, logical IP addressing, and forwarding."
    },
    {
      question: "Which protocol is used to assign IP addresses dynamically?",
      options: ["DNS", "FTP", "DHCP", "ARP"],
      answer: 2,
      explanation: "Dynamic Host Configuration Protocol (DHCP) automatically assigns IP parameters to devices."
    },
    {
      question: "What does TCP provide over UDP?",
      options: [
        "Lower latency always",
        "Connection-oriented reliable delivery",
        "Smaller packet header only",
        "Broadcast by default"
      ],
      answer: 1,
      explanation: "TCP uses 3-way handshakes and acknowledgments to guarantee packet order and delivery."
    },
    {
      question: "Which device forwards packets between different networks?",
      options: ["Hub", "Switch", "Router", "Repeater"],
      answer: 2,
      explanation: "Routers operate at Layer 3 to connect distinct networks and route IP traffic."
    },
    {
      question: "DNS primarily translates:",
      options: [
        "MAC addresses to vendor names",
        "Domain names to IP addresses",
        "IP addresses to port numbers",
        "Plain text to cipher text"
      ],
      answer: 1,
      explanation: "Domain Name System resolves human-friendly names (e.g., example.com) to IP addresses."
    },
    {
      question: "Which protocol is commonly used for secure web browsing?",
      options: ["HTTP", "FTP", "SMTP", "HTTPS"],
      answer: 3,
      explanation: "HTTPS uses TLS/SSL encryption to secure HTTP communication."
    }
  ],
  "Object Oriented Programming": [
    {
      question: "Which concept allows one interface with multiple implementations?",
      options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction only"],
      answer: 2,
      explanation: "Polymorphism enables objects of different types to respond to method calls differently."
    },
    {
      question: "Bundling data and methods in a single unit is:",
      options: ["Encapsulation", "Polymorphism", "Compilation", "Recursion"],
      answer: 0,
      explanation: "Encapsulation restricts direct access to an object's components and bundles state with behavior."
    },
    {
      question: "A class is a:",
      options: [
        "Real object in memory",
        "Blueprint for objects",
        "Compiler instruction",
        "Data type modifier only"
      ],
      answer: 1,
      explanation: "A class acts as an extensible template or blueprint for instantiating objects."
    },
    {
      question: "Which access specifier generally restricts visibility to within the class only?",
      options: ["public", "protected", "private", "global"],
      answer: 2,
      explanation: "Private variables and methods cannot be accessed from outside the class scope."
    },
    {
      question: "Method overloading is resolved at:",
      options: ["Runtime", "Compile time", "Link time only", "Execution end"],
      answer: 1,
      explanation: "Compile-time polymorphism selects the method based on argument count and types during compilation."
    },
    {
      question: "Runtime polymorphism is achieved by:",
      options: ["Function overloading", "Operator overloading", "Method overriding", "Constructors"],
      answer: 2,
      explanation: "Method overriding in inheritance hierarchies resolves calls dynamically at runtime."
    }
  ],
  "Computer Organization and Architecture": [
    {
      question: "The brain of a computer system is:",
      options: ["RAM", "CPU", "ALU only", "Hard disk"],
      answer: 1,
      explanation: "The Central Processing Unit (CPU) executes software instructions and controls arithmetic/logical operations."
    },
    {
      question: "ALU stands for:",
      options: [
        "Arithmetic Logic Unit",
        "Array Logic Utility",
        "Automatic Link Unit",
        "Analog Logic Unit"
      ],
      answer: 0,
      explanation: "The ALU performs integer arithmetic and bitwise logic operations."
    },
    {
      question: "Which memory is volatile?",
      options: ["ROM", "SSD", "RAM", "Hard disk"],
      answer: 2,
      explanation: "RAM loses its stored data when powered off."
    },
    {
      question: "Instruction Register stores:",
      options: [
        "Address of next instruction",
        "Current instruction being executed",
        "Stack top value",
        "Program output"
      ],
      answer: 1,
      explanation: "The Instruction Register holds the binary instruction currently being decoded and executed."
    },
    {
      question: "Cache memory is used to:",
      options: [
        "Increase disk capacity",
        "Bridge speed gap between CPU and main memory",
        "Store operating system only",
        "Replace RAM completely"
      ],
      answer: 1,
      explanation: "SRAM Cache provides fast data access to frequently used instructions."
    },
    {
      question: "Which addressing mode uses the operand value directly in the instruction?",
      options: ["Direct", "Immediate", "Indirect", "Indexed"],
      answer: 1,
      explanation: "Immediate addressing specifies a constant value directly inside the instruction opcode."
    }
  ],
  "Software Engineering": [
    {
      question: "Which model follows sequential phases like requirements, design, implementation, testing?",
      options: ["Agile model", "Spiral model", "Waterfall model", "RAD model"],
      answer: 2,
      explanation: "Waterfall cascades linearly through sequential non-overlapping development phases."
    },
    {
      question: "A UML use-case diagram represents:",
      options: [
        "Database schema only",
        "System interactions with actors",
        "Network topology",
        "Source code syntax"
      ],
      answer: 1,
      explanation: "Use-case diagrams map business functionalities to internal or external actors."
    },
    {
      question: "In Agile, a short fixed development iteration is called:",
      options: ["Patch", "Sprint", "Module", "Cycle lock"],
      answer: 1,
      explanation: "A Sprint is a repeatable time-box (typically 1-4 weeks) in Scrum."
    },
    {
      question: "Which document defines what the software should do?",
      options: ["SRS", "Test log", "User profile only", "Deployment note"],
      answer: 0,
      explanation: "Software Requirements Specification (SRS) details functional and non-functional specifications."
    },
    {
      question: "Unit testing focuses on:",
      options: [
        "Entire system behavior only",
        "Testing smallest testable parts of code",
        "Testing hardware reliability",
        "Testing user interface colors"
      ],
      answer: 1,
      explanation: "Unit tests isolate individual functions, classes, or procedures."
    },
    {
      question: "The main purpose of version control is:",
      options: [
        "Increase CPU speed",
        "Track and manage code changes",
        "Replace testing",
        "Avoid documentation"
      ],
      answer: 1,
      explanation: "Version control systems (like Git) record code revisions and enable team collaboration."
    }
  ],
  "Web Technologies": [
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<p>"],
      answer: 1,
      explanation: "The anchor tag <a> defines hyperlinks to external or internal URLs."
    },
    {
      question: "Which CSS property is used to make text bold?",
      options: ["font-style", "font-weight", "text-decoration", "font-align"],
      answer: 1,
      explanation: "font-weight controls character thickness (e.g. bold or numeric weights like 700)."
    },
    {
      question: "JavaScript is primarily used in web pages to:",
      options: [
        "Store hardware drivers",
        "Add interactivity and dynamic behavior",
        "Replace HTML entirely",
        "Compile CSS"
      ],
      answer: 1,
      explanation: "JavaScript executes client-side scripts to manipulate the DOM dynamically."
    },
    {
      question: "Which HTTP method is typically used to retrieve data?",
      options: ["POST", "PUT", "GET", "DELETE"],
      answer: 2,
      explanation: "GET requests retrieve representation of the specified resource."
    },
    {
      question: "In CSS, display: flex is used for:",
      options: [
        "Audio playback",
        "Flexible layout arrangement",
        "Database connection",
        "Text encryption"
      ],
      answer: 1,
      explanation: "Flexbox aligns and distributes space among items in a container along axes."
    },
    {
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Mapper",
        "Digital Ordinance Model",
        "Document Output Mechanism"
      ],
      answer: 0,
      explanation: "DOM is a programming interface for web documents representing the page structure as a tree."
    }
  ],
  Cybersecurity: [
    {
      question: "Which of the following is a strong password practice?",
      options: [
        "Using your name and birth year",
        "Using one password for all accounts",
        "Using long passwords with mixed characters",
        "Using only numbers"
      ],
      answer: 2,
      explanation: "Mixing uppercase, lowercase, numbers, and symbols increases entropy and brute-force complexity."
    },
    {
      question: "Phishing attacks are designed to:",
      options: [
        "Improve network speed",
        "Trick users into revealing sensitive information",
        "Encrypt backups safely",
        "Remove malware automatically"
      ],
      answer: 1,
      explanation: "Phishing uses deceptive emails or websites to steal credentials or financial details."
    },
    {
      question: "Two-factor authentication improves security by:",
      options: [
        "Requiring only a username",
        "Adding an extra verification step",
        "Removing encryption",
        "Disabling passwords"
      ],
      answer: 1,
      explanation: "2FA combines something you know (password) with something you have (authenticator code/SMS)."
    },
    {
      question: "Which malware type demands payment to restore files?",
      options: ["Spyware", "Worm", "Ransomware", "Adware"],
      answer: 2,
      explanation: "Ransomware encrypts victim files and demands a ransom payment to provide decryption keys."
    },
    {
      question: "A firewall primarily:",
      options: [
        "Cleans monitor screen",
        "Filters incoming and outgoing network traffic",
        "Compiles code",
        "Stores backups"
      ],
      answer: 1,
      explanation: "Firewalls inspect packets and apply security rules to block unauthorized connections."
    },
    {
      question: "Which attack injects malicious SQL statements?",
      options: ["Cross-site request forgery", "SQL Injection", "Brute force attack", "Session timeout"],
      answer: 1,
      explanation: "SQLi exploits unsanitized input concatenated into database query strings."
    }
  ]
};

const QUESTION_DIFFICULTIES = {
  "Data Structures and Algorithms": ["Easy", "Medium", "Hard", "Hard", "Easy", "Medium"],
  "Database Management Systems": ["Easy", "Hard", "Easy", "Medium", "Hard", "Medium"],
  "Operating Systems": ["Hard", "Hard", "Medium", "Easy", "Medium", "Easy"],
  "Computer Networks": ["Easy", "Easy", "Hard", "Medium", "Hard", "Medium"],
  "Object Oriented Programming": ["Hard", "Easy", "Easy", "Medium", "Medium", "Hard"],
  "Computer Organization and Architecture": ["Easy", "Easy", "Medium", "Medium", "Hard", "Hard"],
  "Software Engineering": ["Easy", "Medium", "Easy", "Medium", "Hard", "Hard"],
  "Web Technologies": ["Easy", "Easy", "Medium", "Medium", "Hard", "Hard"],
  Cybersecurity: ["Easy", "Medium", "Medium", "Easy", "Hard", "Hard"]
};

const QUESTION_BANK = Object.entries(SUBJECT_QUESTIONS).flatMap(
  ([subject, questions]) =>
    questions.map((question, index) => ({
      ...question,
      subject,
      category: question.category || subject,
      difficulty: question.difficulty || (QUESTION_DIFFICULTIES[subject] || [])[index] || "Medium"
    }))
);

if (SUBJECT_QUESTIONS["Data Structures and Algorithms"]) {
  SUBJECT_QUESTIONS["Data Structures and Algorithms"][0].imageUrl = "https://images.unsplash.com/photo-1516116211223-48a98968865c?auto=format&fit=crop&w=800&q=80";
  SUBJECT_QUESTIONS["Data Structures and Algorithms"][0].category = "Data Structures";
  
  SUBJECT_QUESTIONS["Data Structures and Algorithms"][1].audioUrl = "https://cdn.freesound.org/previews/566/566270_12497676-lq.mp3";
  SUBJECT_QUESTIONS["Data Structures and Algorithms"][1].category = "Algorithms";
}

if (SUBJECT_QUESTIONS["Web Technologies"]) {
  SUBJECT_QUESTIONS["Web Technologies"][0].imageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
  SUBJECT_QUESTIONS["Web Technologies"][0].category = "Frontend";
  
  SUBJECT_QUESTIONS["Web Technologies"][1].audioUrl = "https://cdn.freesound.org/previews/566/566270_12497676-lq.mp3";
  SUBJECT_QUESTIONS["Web Technologies"][1].category = "Web Protocols";
}

window.SUBJECT_QUESTIONS = SUBJECT_QUESTIONS;
window.QUESTION_DIFFICULTIES = QUESTION_DIFFICULTIES;
window.QUESTION_BANK = QUESTION_BANK;
