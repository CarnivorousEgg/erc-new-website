import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base path for handbook content
const handbookBasePath = path.join(__dirname, '..', 'handbook-temp');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'handbook.json');

// Define the handbook structure based on the website navigation
const handbook = {
  categories: [
    {
      id: "roadmap",
      name: "Roadmap",
      icon: "🗺️",
      description: "Getting started with robotics - languages, tools, and learning paths",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: "automation",
      name: "Automation",
      icon: "🤖",
      description: "ROS, path planning, control theory, and autonomous systems",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: "⚡",
      description: "Microcontrollers, sensors, actuators, and circuit design",
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: "mechanical",
      name: "Mechanical",
      icon: "⚙️",
      description: "Robot design, kinematics, dynamics, and CAD",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "simulation",
      name: "Simulation",
      icon: "🖥️",
      description: "Gazebo, STDR, and virtual robot testing environments",
      color: "from-pink-500 to-rose-600"
    }
  ],
  articles: []
};

// Helper function to parse markdown content
function parseMarkdownContent(content) {
  const blocks = [];
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (!line.trim()) {
      i++;
      continue;
    }

    // Main headings (# )
    if (line.startsWith('# ')) {
      blocks.push({
        type: 'heading',
        value: line.replace(/^#\s+/, '').trim()
      });
      i++;
    }
    // Subheadings (## )
    else if (line.startsWith('## ')) {
      blocks.push({
        type: 'heading',
        value: line.replace(/^##\s+/, '').trim()
      });
      i++;
    }
    // Sub-subheadings (### )
    else if (line.startsWith('### ')) {
      blocks.push({
        type: 'subheading',
        value: line.replace(/^###\s+/, '').trim()
      });
      i++;
    }
    // Code blocks
    else if (line.startsWith('```')) {
      const language = line.replace(/^```/, '').trim() || 'text';
      i++;
      let codeLines = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (codeLines.length > 0) {
        blocks.push({
          type: 'code',
          language: language,
          value: codeLines.join('\n')
        });
      }
      i++; // Skip closing ```
    }
    // Images (markdown or HTML)
    else if (line.includes('![') || line.includes('<center>![') || line.includes('<img')) {
      // Extract image path and alt text
      const imgMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imgMatch) {
        const alt = imgMatch[1];
        let src = imgMatch[2];
        
        // Convert relative paths to handbook paths
        if (src.startsWith('images/')) {
          // Determine category from path context
          src = `/images/handbook/${src}`;
        }
        
        blocks.push({
          type: 'image',
          src: src,
          alt: alt || 'Image',
          caption: alt || ''
        });
      }
      i++;
    }
    // Bullet lists or numbered lists
    else if (line.match(/^[\*\-\+]\s+/) || line.match(/^\d+\.\s+/)) {
      let textLines = [];
      while (i < lines.length && (lines[i].match(/^[\*\-\+]\s+/) || lines[i].match(/^\d+\.\s+/) || lines[i].match(/^\s+[\*\-\+]\s+/) || (lines[i].trim() && !lines[i].match(/^#/)))) {
        if (lines[i].trim()) {
          textLines.push(lines[i]);
        }
        i++;
        if (i < lines.length && !lines[i].trim()) {
          break;
        }
      }
      if (textLines.length > 0) {
        blocks.push({
          type: 'text',
          value: textLines.join('\n')
        });
      }
    }
    // Regular text paragraphs
    else if (line.trim() && !line.startsWith('<center>') && !line.startsWith('</center>')) {
      let textLines = [line];
      i++;
      // Collect consecutive lines that are part of the same paragraph
      while (i < lines.length && lines[i].trim() && !lines[i].startsWith('#') && !lines[i].startsWith('```') && !lines[i].match(/^[\*\-\+]\s+/) && !lines[i].match(/^\d+\.\s+/)) {
        textLines.push(lines[i]);
        i++;
      }
      
      const text = textLines.join('\n').trim();
      if (text) {
        // Check if this contains links for resources section
        if (text.includes('](http') || text.includes('](https')) {
          const linkMatches = [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
          if (linkMatches.length > 0) {
            const items = linkMatches.map(match => ({
              name: match[1],
              url: match[2]
            }));
            blocks.push({
              type: 'resources',
              items: items
            });
          } else {
            blocks.push({
              type: 'text',
              value: text
            });
          }
        } else {
          blocks.push({
            type: 'text',
            value: text
          });
        }
      }
    }
    else {
      i++;
    }
  }

  return blocks;
}

// Read markdown file and create article
function createArticle(filePath, id, title, category, subcategory, excerpt) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsedContent = parseMarkdownContent(content);
    
    const article = {
      id,
      title,
      category,
      excerpt
    };
    
    if (subcategory) {
      article.subcategory = subcategory;
    }
    
    article.content = parsedContent;
    
    return article;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

// Add all articles
try {
  // Roadmap
  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'roadmap.md'),
    'roadmap',
    'Roadmap for Robotics',
    'roadmap',
    null,
    'A comprehensive guide for beginners covering programming languages, development tools, and learning paths for all aspects of robotics.'
  ));

  // Automation
  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'automation', 'intro.md'),
    'automation-intro',
    'Introduction to Automation',
    'automation',
    null,
    'Overview of automation in robotics - planning, control systems, and state estimation for autonomous robots.'
  ));

  // ROS Articles
  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'automation', 'ROS', 'setting_up.md'),
    'ros-setup',
    'Setting Up ROS',
    'automation',
    'ROS',
    'Complete guide to setting up your ROS development environment including OS, ROS installation, and essential tools.'
  ));

  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'automation', 'ROS', 'ros.md'),
    'ros-basics',
    'Getting Started with ROS',
    'automation',
    'ROS',
    'Learn ROS fundamentals including nodes, topics, publishers, subscribers, and the catkin build system.'
  ));

  if (fs.existsSync(path.join(handbookBasePath, 'automation', 'ROS', 'ros_p2.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'automation', 'ROS', 'ros_p2.md'),
      'ros-parameters',
      'ROS Parameters and Advanced Concepts',
      'automation',
      'ROS',
      'Advanced ROS concepts including parameters, launch files, and message types.'
    ));
  }

  // Path Planning
  if (fs.existsSync(path.join(handbookBasePath, 'automation', 'PathPlanners', 'Introduction_to_Path_Planning_in_Robotics', 'intro.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'automation', 'PathPlanners', 'Introduction_to_Path_Planning_in_Robotics', 'intro.md'),
      'path-planning-intro',
      'Introduction to Path Planning',
      'automation',
      'Path Planning',
      'Overview of path planning algorithms and their applications in robotics.'
    ));
  }

  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'automation', 'PathPlanners', 'Graph_Based_Algorithms', 'Astar.md'),
    'path-planning-astar',
    'A* Algorithm',
    'automation',
    'Path Planning',
    'A-star is a graph-based, path search algorithm known for its completeness, optimality, and optimal efficiency.'
  ));

  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'automation', 'PathPlanners', 'Graph_Based_Algorithms', 'Dijkstra.md'),
    'path-planning-dijkstra',
    "Dijkstra's Algorithm",
    'automation',
    'Path Planning',
    "Dijkstra's algorithm for finding shortest paths between nodes in a graph."
  ));

  // Sampling-based algorithms
  if (fs.existsSync(path.join(handbookBasePath, 'automation', 'PathPlanners', 'Sampling_Based_Algorithms', 'RRT.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'automation', 'PathPlanners', 'Sampling_Based_Algorithms', 'RRT.md'),
      'path-planning-rrt',
      'Rapidly-exploring Random Tree (RRT)',
      'automation',
      'Path Planning',
      'RRT is a sampling-based path planning algorithm for high-dimensional spaces.'
    ));
  }

  if (fs.existsSync(path.join(handbookBasePath, 'automation', 'PathPlanners', 'Sampling_Based_Algorithms', 'RRT_Star.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'automation', 'PathPlanners', 'Sampling_Based_Algorithms', 'RRT_Star.md'),
      'path-planning-rrt-star',
      'RRT* (RRT Star)',
      'automation',
      'Path Planning',
      'An optimized version of RRT that provides asymptotically optimal solutions.'
    ));
  }

  if (fs.existsSync(path.join(handbookBasePath, 'automation', 'PathPlanners', 'Sampling_Based_Algorithms', 'PRM.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'automation', 'PathPlanners', 'Sampling_Based_Algorithms', 'PRM.md'),
      'path-planning-prm',
      'Probabilistic Roadmap (PRM)',
      'automation',
      'Path Planning',
      'PRM is a sampling-based algorithm that creates a roadmap of the free space.'
    ));
  }

  // Control Theory
  if (fs.existsSync(path.join(handbookBasePath, 'automation', 'ControlTheory', 'Control_Theory.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'automation', 'ControlTheory', 'Control_Theory.md'),
      'control-theory-intro',
      'Introduction to Control Theory',
      'automation',
      'Control Theory',
      'Fundamentals of control systems for robotics applications.'
    ));
  }

  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'automation', 'ControlTheory', 'PID_Controller.md'),
    'pid-controller',
    'PID Controller',
    'automation',
    'Control Theory',
    'PID control is the most popular technique used in industries because it is relatively easy and simple to design and implement.'
  ));

  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'automation', 'ControlTheory', 'LQR.md'),
    'lqr-controller',
    'Linear Quadratic Regulator (LQR)',
    'automation',
    'Control Theory',
    'LQR is an optimal control technique that minimizes a quadratic cost function for linear systems.'
  ));

  if (fs.existsSync(path.join(handbookBasePath, 'automation', 'ControlTheory', 'MPC.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'automation', 'ControlTheory', 'MPC.md'),
      'mpc-controller',
      'Model Predictive Control (MPC)',
      'automation',
      'Control Theory',
      'MPC is an advanced control method that uses a model to predict future system behavior.'
    ));
  }

  // Electronics
  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'electronics', 'intro.md'),
    'electronics-intro',
    'Introduction to Electronics',
    'electronics',
    null,
    'Overview of electronics in robotics - processing units, sensors, and interfacing components.'
  ));

  // Development Boards
  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'electronics', 'Development_Boards', 'Arduino.md'),
    'arduino',
    'Arduino',
    'electronics',
    'Development Boards',
    'Arduino is a very accessible and easy to program microcontroller, great for beginners in robotics.'
  ));

  if (fs.existsSync(path.join(handbookBasePath, 'electronics', 'Development_Boards', 'ESP32.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'electronics', 'Development_Boards', 'ESP32.md'),
      'esp32',
      'ESP32',
      'electronics',
      'Development Boards',
      'ESP32 is a powerful WiFi and Bluetooth enabled microcontroller.'
    ));
  }

  if (fs.existsSync(path.join(handbookBasePath, 'electronics', 'Development_Boards', 'STM32.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'electronics', 'Development_Boards', 'STM32.md'),
      'stm32',
      'BluePill (STM32F103C8T6)',
      'electronics',
      'Development Boards',
      'STM32 is a family of powerful ARM Cortex-M microcontrollers.'
    ));
  }

  if (fs.existsSync(path.join(handbookBasePath, 'electronics', 'Development_Boards', 'STM32vsArduinoUNO.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'electronics', 'Development_Boards', 'STM32vsArduinoUNO.md'),
      'stm32-vs-arduino',
      'Arduino vs STM32',
      'electronics',
      'Development Boards',
      'Comparison between Arduino and STM32 microcontrollers.'
    ));
  }

  if (fs.existsSync(path.join(handbookBasePath, 'electronics', 'Development_Boards', 'Pyboard.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'electronics', 'Development_Boards', 'Pyboard.md'),
      'pyboard',
      'Pyboard - MicroPython',
      'electronics',
      'Development Boards',
      'Pyboard runs MicroPython, making it easy to program microcontrollers with Python.'
    ));
  }

  // Electronics components
  if (fs.existsSync(path.join(handbookBasePath, 'electronics', 'Basic_Electronic_Components', 'breadboard.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'electronics', 'Basic_Electronic_Components', 'breadboard.md'),
      'breadboard',
      'Breadboard',
      'electronics',
      'Basic Components',
      'Understanding breadboards for prototyping electronic circuits.'
    ));
  }

  // Sensors
  if (fs.existsSync(path.join(handbookBasePath, 'electronics', 'Sensors', 'lidar.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'electronics', 'Sensors', 'lidar.md'),
      'lidar',
      'LIDAR',
      'electronics',
      'Sensors',
      'LIDAR sensors for distance measurement and mapping.'
    ));
  }

  // Motors
  if (fs.existsSync(path.join(handbookBasePath, 'electronics', 'Motors', 'ServoMotor.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'electronics', 'Motors', 'ServoMotor.md'),
      'servo-motor',
      'Servo Motors',
      'electronics',
      'Motors',
      'Understanding servo motors and their applications in robotics.'
    ));
  }

  // Modules
  if (fs.existsSync(path.join(handbookBasePath, 'electronics', 'Modules', 'wifi_module.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'electronics', 'Modules', 'wifi_module.md'),
      'wifi-module',
      'WiFi Module',
      'electronics',
      'Modules',
      'WiFi modules for wireless communication in robotics projects.'
    ));
  }

  // Mechanical
  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'mechanical', 'intro.md'),
    'mechanical-intro',
    'Introduction to Mechanical Design',
    'mechanical',
    null,
    'Overview of mechanical aspects in robotics - design, kinematics, dynamics, and CAD.'
  ));

  if (fs.existsSync(path.join(handbookBasePath, 'mechanical', 'mech101.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'mechanical', 'mech101.md'),
      'mechanical-101',
      'Mechanical 101',
      'mechanical',
      'Basics',
      'Basic mechanical concepts for robotics.'
    ));
  }

  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'mechanical', 'Gears.md'),
    'gears',
    'Gears',
    'mechanical',
    'Components',
    'Comprehensive guide to gears - types, advantages, and applications in robotics.'
  ));

  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'mechanical', 'drive_mechanism.md'),
    'drive-mechanism',
    'Drive Mechanism',
    'mechanical',
    'Kinematics',
    'Understanding different drive mechanisms for wheeled robots - differential drive, Ackermann steering, and omnidirectional drive.'
  ));

  if (fs.existsSync(path.join(handbookBasePath, 'mechanical', 'position and orientation.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'mechanical', 'position and orientation.md'),
      'position-orientation',
      'Position and Orientation',
      'mechanical',
      'Kinematics',
      'Understanding position and orientation in robotics.'
    ));
  }

  if (fs.existsSync(path.join(handbookBasePath, 'mechanical', 'Joint Kinematics.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'mechanical', 'Joint Kinematics.md'),
      'joint-kinematics',
      'Joint Kinematics',
      'mechanical',
      'Kinematics',
      'Understanding joint kinematics for robotic arms and manipulators.'
    ));
  }

  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'mechanical', 'Forward and Inverse Kinematics.md'),
    'kinematics',
    'Forward and Inverse Kinematics',
    'mechanical',
    'Kinematics',
    'Understanding forward and inverse kinematics for robot manipulators and serial-chain mechanisms.'
  ));

  if (fs.existsSync(path.join(handbookBasePath, 'mechanical', 'Introduction to Dynamics.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'mechanical', 'Introduction to Dynamics.md'),
      'dynamics',
      'Introduction to Dynamics',
      'mechanical',
      'Dynamics',
      'Fundamentals of robot dynamics and motion equations.'
    ));
  }

  // Simulation
  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'simulation', 'intro.md'),
    'simulation-intro',
    'Introduction to Simulation',
    'simulation',
    null,
    'Overview of simulation in robotics - why it\'s essential and how it helps in robot development.'
  ));

  handbook.articles.push(createArticle(
    path.join(handbookBasePath, 'simulation', 'gazebo', 'basics.md'),
    'gazebo',
    'Gazebo Simulator',
    'simulation',
    'Gazebo',
    'Gazebo is the most popular physics simulator for robotics development, fully integrated with ROS.'
  ));

  if (fs.existsSync(path.join(handbookBasePath, 'simulation', 'gazebo', 'Robot_Description.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'simulation', 'gazebo', 'Robot_Description.md'),
      'robot-description',
      'Robot Description (URDF/SDF)',
      'simulation',
      'Gazebo',
      'Creating robot descriptions using URDF and SDF formats for Gazebo simulation.'
    ));
  }

  if (fs.existsSync(path.join(handbookBasePath, 'simulation', 'stdr', 'Basics.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'simulation', 'stdr', 'Basics.md'),
      'stdr',
      'STDR Simulator',
      'simulation',
      'STDR',
      'Simple Two-Dimensional Robot Simulator for quick prototyping.'
    ));
  }

  // Add About and Misc if they exist
  if (fs.existsSync(path.join(handbookBasePath, 'about.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'about.md'),
      'about',
      'About the Handbook',
      'about',
      null,
      'About the ERC Handbook and how to contribute.'
    ));
  }

  if (fs.existsSync(path.join(handbookBasePath, 'misc.md'))) {
    handbook.articles.push(createArticle(
      path.join(handbookBasePath, 'misc.md'),
      'misc',
      'Miscellaneous Resources',
      'misc',
      null,
      'Additional resources and useful links for robotics enthusiasts.'
    ));
  }

  // Filter out null articles (files that couldn't be read)
  handbook.articles = handbook.articles.filter(article => article !== null);

  // Write the output
  fs.writeFileSync(outputPath, JSON.stringify(handbook, null, 2), 'utf-8');
  console.log(`✅ Successfully generated handbook.json with ${handbook.articles.length} articles`);
  console.log(`Output saved to: ${outputPath}`);

} catch (error) {
  console.error('Error generating handbook:', error);
  process.exit(1);
}
