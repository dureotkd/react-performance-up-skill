import React from "react";
import "./App.css";
import { Virtuoso } from "react-virtuoso";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer/dist/declarations/src";

/**
 * react-window 참고문헌
 * # https://ridicorp.com/story/ridi-markdown-improvements/#02_1_eliments_optimization
 *
 * react-virtuoso
 */

type TodoType = {
  userId: number;
  title: string;
  id: number;
  completed: boolean;
};

type FixedSizeTodosProps = {
  items: TodoType[];
};

/**
 * * react-window
 */
// const FixedSizeTodos: React.FC<FixedSizeTodosProps> = ({ items }) => {
//   return (
//     <List width={"100%"} height={1200} itemCount={items.length} itemSize={30}>
//       {({ index }) => {
//         return (
//           <div
//             style={{
//               display: "flex",
//             }}
//           >
//             <p>{items[index].title}</p>
//             <p>{items[index].completed ? "✔" : "❌"}</p>
//           </div>
//         );
//       }}
//     </List>
//   );
// };
/**
 * * react-virtuoso
 */
const TodoList: React.FC<FixedSizeTodosProps> = ({ items }) => {
  return (
    <Virtuoso
      style={{ height: "100%" }}
      data={items}
      totalCount={items.length}
      itemContent={(index) => {
        return (
          <div
            style={{
              display: "flex",
            }}
          >
            <p>{items[index].title}</p>
            <p>{items[index].completed ? "✔" : "❌"}</p>
          </div>
        );
      }}
    />
  );
};

function App() {
  const [todos, setTodos] = React.useState<TodoType[]>([]);

  React.useEffect(() => {
    (async (): Promise<void> => {
      const data = await fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .catch((e) => {
          throw new Error(e);
        });

      setTodos(data);
    })();
  }, []);

  return (
    <div
      className="App"
      style={{ backgroundColor: "#ececec", height: "100vh" }}
    >
      {/* <FixedSizeTodos items={todos} /> */}
      <TodoList items={todos} />
    </div>
  );
}

export default App;
