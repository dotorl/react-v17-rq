import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '@pages/index';
import Detail from '@pages/detail';

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
					<Route path="/detail/*" element={<Detail />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
