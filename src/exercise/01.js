import { useEffect } from "react";

// Define the custom hook
export function useDocumentTitle() {
  useEffect(() => {
    document.title = "Welcome to the home page!";
  }, []);
}

// Our component using the custom hook
export default function Home() {
  // Call the useDocumentTitle hook
  useDocumentTitle();

  return (
    <div>
      <h1>Home Page</h1>
      <p>
        To see the title change in the browser tab, click the 'Open in new tab'
        link above
      </p>
    </div>
  );
}

}
