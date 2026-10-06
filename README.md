# Battleship

[Live Demo](https://battleship-top-project.vercel.app/)

This is a classic Battleship game built with React, pure JavaScript, and Vitest. I created this project to practise test-driven development, separated software architecture, and clean user interface design as part of The Odin Project curriculum.

The main goal was to separate the game engine logic completely from the React user interface. Players face an automated computer opponent, launch attacks on a 10x10 ocean grid, and race to sink the hidden enemy fleet.

---

## Features

- **Decoupled Game Engine**: All game rules, ship tracking, and turn logic run in pure JavaScript without any reliance on React.
- **Automated Fleet Placement**: Ships are placed randomly across valid, non-overlapping coordinates at the start of every match for high replay value.
- **Protected Enemy Grid**: The enemy board hides unattacked ship positions completely by never sending enemy ship coordinates into the browser DOM.
- **Accessible Grid Controls**: Grid squares use semantic `<button>` elements with descriptive `aria-label` coordinates for keyboard navigation and screen readers.
- **Defensive Board Locks**: The enemy grid disables automatically when a match ends to prevent extra attacks, with a clean restart control to play again.

---

## What I Learned

Building this game helped me move beyond basic component rendering and focus on software structure, unit testing, and reliable state updates.

Key takeaways from this project include:

- **Separation of Concerns**: I kept the core game rules completely independent of the view layer. Writing the game logic in pure JavaScript first meant I could test rules directly in Vitest before building the user interface in React.
- **Test-Driven Development (TDD)**: I wrote unit tests for gameboards, ships, and interface components using Vitest and React Testing Library. I learned to test rules and boundaries—such as fleet square counts and non-overlapping placements—rather than testing internal code details.
- **Stable Coordinate Matching**: In JavaScript, arrays compare by memory reference rather than value. I solved visual coordinate bugs by checking row and column numbers directly during component renders, ensuring hits, misses, and ship markers display correctly.
- **Declarative Resets in React**: Rather than writing loops to clear arrays and reset internal flags manually, I reset the game by replacing the engine instance in React state. This pattern avoids lingering state bugs and keeps the restart flow simple.

---

## Acknowledgements

- This project is based on the [Battleship assignment](https://www.theodinproject.com/lessons/node-path-javascript-battleship) from The Odin Project.
- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Vitest](https://vitest.dev/).