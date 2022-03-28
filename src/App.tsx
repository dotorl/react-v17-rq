import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '@pages/index';

function App() {
	(async () => {
		const { worker } = await import('@mocks/browser');
		worker.start();
	})();
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
