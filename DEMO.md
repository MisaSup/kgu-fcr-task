# RE-01-demo

```
"dependencies": {
  "react": "^19.x",
  "react-dom": "^19.x",
  "zod": "^4.6.7"
},
"devDependencies": {
  "@types/react": "^19.x",
  "@types/react-dom": "^19.x",
  "esbuild": "0.28.2",
  "typescript": "^7.0.2"
}
```

```
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('app')!).render(<App />);
```