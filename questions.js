const SUBJECT_QUESTIONS = {
  "Data Structures and Algorithms": [
    {
      question: "Which data structure follows the Last In First Out principle?",
      options: ["Queue", "Stack", "Linked List", "Heap"],
      answer: 1
    },
    {
      question: "What is the average time complexity of binary search on a sorted array?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: 1
    },
    {
      question: "Which traversal gives sorted output in a Binary Search Tree?",
      options: ["Preorder", "Postorder", "Level order", "Inorder"],
      answer: 3
    },
    {
      question: "Which sorting algorithm is stable by default?",
      options: ["Selection sort", "Heap sort", "Merge sort", "Quick sort"],
      answer: 2
    },
    {
      question: "In a min-heap, the value at the root node is:",
      options: [
        "Always the median",
        "Always the maximum",
        "Always the minimum",
        "Undefined"
      ],
      answer: 2
    },
    {
      question: "Which data structure is typically used for BFS in a graph?",
      options: ["Stack", "Queue", "Priority queue", "Hash table"],
      answer: 1
    }
  ],
  "Database Management Systems": [
    {
      question: "Which SQL command is used to remove a table and its structure?",
      options: ["DELETE", "REMOVE", "TRUNCATE", "DROP"],
      answer: 3
    },
    {
      question: "Which normal form removes transitive dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: 2
    },
    {
      question: "Which key uniquely identifies each row in a table?",
      options: ["Candidate key", "Primary key", "Foreign key", "Composite key"],
      answer: 1
    },
    {
      question: "Which SQL clause is used to filter grouped results?",
      options: ["WHERE", "ORDER BY", "HAVING", "GROUP FILTER"],
      answer: 2
    },
    {
      question: "ACID property that ensures all operations in a transaction happen or none happen is:",
      options: ["Consistency", "Isolation", "Durability", "Atomicity"],
      answer: 3
    },
    {
      question: "A foreign key is used to:",
      options: [
        "Store file data",
        "Link related tables",
        "Encrypt rows",
        "Create indexes only"
      ],
      answer: 1
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
      answer: 2
    },
    {
      question: "A deadlock can occur when processes hold and wait for resources due to:",
      options: [
        "Mutual exclusion",
        "Preemption",
        "Time slicing",
        "Spooling"
      ],
      answer: 0
    },
    {
      question: "Virtual memory primarily allows:",
      options: [
        "Faster CPU clock speed",
        "Execution of bigger programs than physical RAM",
        "Eliminating cache memory",
        "No need for secondary storage"
      ],
      answer: 1
    },
    {
      question: "Which component of OS manages files and directories?",
      options: ["Process manager", "Memory manager", "File system", "Shell only"],
      answer: 2
    },
    {
      question: "In paging, logical memory is divided into:",
      options: ["Segments", "Frames", "Pages", "Blocks"],
      answer: 2
    },
    {
      question: "Context switching means:",
      options: [
        "Changing user password",
        "Saving and loading process state",
        "Moving files between disks",
        "Restarting the operating system"
      ],
      answer: 1
    }
  ],
  "Computer Networks": [
    {
      question: "Which layer of the OSI model handles routing?",
      options: ["Data Link", "Network", "Transport", "Session"],
      answer: 1
    },
    {
      question: "Which protocol is used to assign IP addresses dynamically?",
      options: ["DNS", "FTP", "DHCP", "ARP"],
      answer: 2
    },
    {
      question: "What does TCP provide over UDP?",
      options: [
        "Lower latency always",
        "Connection-oriented reliable delivery",
        "Smaller packet header only",
        "Broadcast by default"
      ],
      answer: 1
    },
    {
      question: "Which device forwards packets between different networks?",
      options: ["Hub", "Switch", "Router", "Repeater"],
      answer: 2
    },
    {
      question: "DNS primarily translates:",
      options: [
        "MAC addresses to vendor names",
        "Domain names to IP addresses",
        "IP addresses to port numbers",
        "Plain text to cipher text"
      ],
      answer: 1
    },
    {
      question: "Which protocol is commonly used for secure web browsing?",
      options: ["HTTP", "FTP", "SMTP", "HTTPS"],
      answer: 3
    }
  ],
  "Object Oriented Programming": [
    {
      question: "Which concept allows one interface with multiple implementations?",
      options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction only"],
      answer: 2
    },
    {
      question: "Bundling data and methods in a single unit is:",
      options: ["Encapsulation", "Polymorphism", "Compilation", "Recursion"],
      answer: 0
    },
    {
      question: "A class is a:",
      options: [
        "Real object in memory",
        "Blueprint for objects",
        "Compiler instruction",
        "Data type modifier only"
      ],
      answer: 1
    },
    {
      question: "Which access specifier generally restricts visibility to within the class only?",
      options: ["public", "protected", "private", "global"],
      answer: 2
    },
    {
      question: "Method overloading is resolved at:",
      options: ["Runtime", "Compile time", "Link time only", "Execution end"],
      answer: 1
    },
    {
      question: "Runtime polymorphism is achieved by:",
      options: ["Function overloading", "Operator overloading", "Method overriding", "Constructors"],
      answer: 2
    }
  ],
  "Computer Organization and Architecture": [
    {
      question: "The brain of a computer system is:",
      options: ["RAM", "CPU", "ALU only", "Hard disk"],
      answer: 1
    },
    {
      question: "ALU stands for:",
      options: [
        "Arithmetic Logic Unit",
        "Array Logic Utility",
        "Automatic Link Unit",
        "Analog Logic Unit"
      ],
      answer: 0
    },
    {
      question: "Which memory is volatile?",
      options: ["ROM", "SSD", "RAM", "Hard disk"],
      answer: 2
    },
    {
      question: "Instruction Register stores:",
      options: [
        "Address of next instruction",
        "Current instruction being executed",
        "Stack top value",
        "Program output"
      ],
      answer: 1
    },
    {
      question: "Cache memory is used to:",
      options: [
        "Increase disk capacity",
        "Bridge speed gap between CPU and main memory",
        "Store operating system only",
        "Replace RAM completely"
      ],
      answer: 1
    },
    {
      question: "Which addressing mode uses the operand value directly in the instruction?",
      options: ["Direct", "Immediate", "Indirect", "Indexed"],
      answer: 1
    }
  ],
  "Software Engineering": [
    {
      question: "Which model follows sequential phases like requirements, design, implementation, testing?",
      options: ["Agile model", "Spiral model", "Waterfall model", "RAD model"],
      answer: 2
    },
    {
      question: "A UML use-case diagram represents:",
      options: [
        "Database schema only",
        "System interactions with actors",
        "Network topology",
        "Source code syntax"
      ],
      answer: 1
    },
    {
      question: "In Agile, a short fixed development iteration is called:",
      options: ["Patch", "Sprint", "Module", "Cycle lock"],
      answer: 1
    },
    {
      question: "Which document defines what the software should do?",
      options: ["SRS", "Test log", "User profile only", "Deployment note"],
      answer: 0
    },
    {
      question: "Unit testing focuses on:",
      options: [
        "Entire system behavior only",
        "Testing smallest testable parts of code",
        "Testing hardware reliability",
        "Testing user interface colors"
      ],
      answer: 1
    },
    {
      question: "The main purpose of version control is:",
      options: [
        "Increase CPU speed",
        "Track and manage code changes",
        "Replace testing",
        "Avoid documentation"
      ],
      answer: 1
    }
  ],
  "Web Technologies": [
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<p>"],
      answer: 1
    },
    {
      question: "Which CSS property is used to make text bold?",
      options: ["font-style", "font-weight", "text-decoration", "font-align"],
      answer: 1
    },
    {
      question: "JavaScript is primarily used in web pages to:",
      options: [
        "Store hardware drivers",
        "Add interactivity and dynamic behavior",
        "Replace HTML entirely",
        "Compile CSS"
      ],
      answer: 1
    },
    {
      question: "Which HTTP method is typically used to retrieve data?",
      options: ["POST", "PUT", "GET", "DELETE"],
      answer: 2
    },
    {
      question: "In CSS, display: flex is used for:",
      options: [
        "Audio playback",
        "Flexible layout arrangement",
        "Database connection",
        "Text encryption"
      ],
      answer: 1
    },
    {
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Mapper",
        "Digital Ordinance Model",
        "Document Output Mechanism"
      ],
      answer: 0
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
      answer: 2
    },
    {
      question: "Phishing attacks are designed to:",
      options: [
        "Improve network speed",
        "Trick users into revealing sensitive information",
        "Encrypt backups safely",
        "Remove malware automatically"
      ],
      answer: 1
    },
    {
      question: "Two-factor authentication improves security by:",
      options: [
        "Requiring only a username",
        "Adding an extra verification step",
        "Removing encryption",
        "Disabling passwords"
      ],
      answer: 1
    },
    {
      question: "Which malware type demands payment to restore files?",
      options: ["Spyware", "Worm", "Ransomware", "Adware"],
      answer: 2
    },
    {
      question: "A firewall primarily:",
      options: [
        "Cleans monitor screen",
        "Filters incoming and outgoing network traffic",
        "Compiles code",
        "Stores backups"
      ],
      answer: 1
    },
    {
      question: "Which attack injects malicious SQL statements?",
      options: ["Cross-site request forgery", "SQL Injection", "Brute force attack", "Session timeout"],
      answer: 1
    }
  ]
};

const QUESTION_BANK = Object.entries(SUBJECT_QUESTIONS).flatMap(
  ([subject, questions]) =>
    questions.map((question) => ({
      ...question,
      subject
    }))
);
