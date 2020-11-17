import { useState } from "react";

export default function TableState() {
  const [headers, setHeaders] = useState([]);

  const setHeader = (value) => setHeaders(value);

  return { headers, setHeader };
}
