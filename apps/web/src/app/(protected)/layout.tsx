export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<p>Main layout</p>
			{children}
		</div>
	);
}
