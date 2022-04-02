import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '@pages/index';
import TestPage from '@pages/test';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getIsMobile } from './utils/utils';

function App() {
	(async () => {
		const { worker } = await import('@mocks/browser');
		worker.start();
	})();

	const queryClient = new QueryClient();
	const isMobile = getIsMobile();

	useEffect(() => {
		if (isMobile) {
			document.getElementsByTagName('html')[0].classList.add('mobile-mode');
		} else {
			document.getElementsByTagName('html')[0].classList.remove('mobile-mode');
		}
	}, [isMobile]);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/test" element={<TestPage />} />
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
}

export default App;
