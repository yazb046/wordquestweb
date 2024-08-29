import { Layout } from 'antd';
import { Footer, Header } from 'antd/es/layout/layout';
import { useResizable } from 'react-resizable-layout';
import GoalsList from './GoalsList';
import StepsView from './StepsView';

export default function MainPage() {
	const { position, separatorProps } = useResizable({
		axis: 'x',
		initial: 350, // Дефолтная ширина
	});

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header style={styles.header}>Header</Header>
			<Layout style={{ ...styles.mainLayout, height: 'calc(100vh - 135px)' }}>
				<div style={{ display: 'flex', height: '100%' }}>
					<div
						style={{
							width: position,
							background: '#ebf0f5',
							border: '1px solid #dcdcdc',
							overflow: 'auto',
						}}>
						<GoalsList />
					</div>
					<div
						{...separatorProps}
						style={{ cursor: 'col-resize', background: '#dcdcdc', width: '5px' }}
					/>
					<div
						style={{
							flexGrow: 1,
							background: '#ebf0f5',
							border: '1px solid #dcdcdc',
							overflow: 'auto',
						}}>
						<StepsView />
					</div>
				</div>
			</Layout>
			<Footer style={styles.footer}>Footer</Footer>
		</Layout>
	);
}

const styles = {
	header: {
		background: '#ebf0f5',
		height: '5vh',
		border: '1px solid #dcdcdc',
		margin: '10px',
		display: 'flex',
		alignItems: 'center',
	},
	sider: {
		background: '#ebf0f5',
		border: '1px solid #dcdcdc',
		margin: '10px',
	},
	content: {
		background: '#ebf0f5',
		border: '1px solid #dcdcdc',
		margin: '10px',
		marginLeft: '0px',
	},
	mainLayout: {
		background: '#f0f2f5',
		marginLeft: '10px',
		marginRight: '10px',
		border: '1px solid #dcdcdc',
	},
	footer: {
		background: '#ebf0f5',
		margin: '10px',
		height: '5vh',
		border: '1px solid #dcdcdc',
		display: 'flex',
		alignItems: 'center',
	},
};
