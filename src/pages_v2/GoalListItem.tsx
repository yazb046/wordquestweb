import React, { useEffect, useState } from 'react';
import { useGoalId } from './hooks/useGoalId';
import { PlusOutlined, ProfileOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Tooltip, Button } from 'antd';

import StepModal from './StepModal';
import StepsList from './StepsList';
import ThemeOptions from './DeleteButton';
import { Empty_Iterable } from './types/IterableClass';

import Iterable from './types/Iterable';

interface Props {
	item: any;
}

const GoalListItem: React.FC<Props> = ({ item }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [reloadList, setReloadList] = useState(false);
	const [goalId, setGoalId] = useGoalId();
	const [_goalId, setLocalGoalId] = useState(0);
	const [isExpanded, setIsExpanded] = useState(false);
	const [hoveredExpand, setHoveredExpand] = useState(false); // Состояние для hover на кнопке развёртывания
	const [hoveredAdd, setHoveredAdd] = useState(false); // Состояние для hover на кнопке добавления шага
	const [hoveredView, setHoveredView] = useState(false); // Состояние для hover на кнопке просмотра шагов

	useEffect(() => {
		setGoalId(_goalId);
		console.log('new goal id' + goalId);
	}, [_goalId]);

	useEffect(() => {
		if (reloadList) setReloadList(false);
	}, [reloadList]);

	const onClickAddStep = (e: any) => {
		e.stopPropagation();
		console.log('Add button clicked for ' + e);
		setModalOpen(true);
	};

	const onClickViewSteps = (e: any, itemId: number) => {
		e.stopPropagation();
		console.log('view steps is clicked for ' + itemId);
		setLocalGoalId(itemId);
	};

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div style={{background:'#f5f5f5', borderRadius:'5px', padding:"5px", marginBottom:"5px"}}>
			<StepModal
				key={item.getId()}
				goalType={''}
				goalId={item.getId()}
				step={Empty_Iterable}
				openModal={modalOpen}
				closeModalCallback={() => {
					setModalOpen(false);
					setReloadList(!reloadList);

				}}
			/>

			<div style={{ display: 'flex', alignItems: 'center', gap: '5px', width:"100%"}}>
				<Button
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '16px',
						cursor: 'pointer',
						background: 'transparent',
						border: hoveredExpand ? undefined : 'none',
					}}
					icon={<CaretRightOutlined rotate={isExpanded ? 90 : 0} />}
					onClick={toggleExpand}
					onMouseEnter={() => setHoveredExpand(true)} // Hover только для этой кнопки
					onMouseLeave={() => setHoveredExpand(false)}
				/>
				<span style={{ flex: 1 }}>{item.getTitle()}</span>
				<Tooltip title='Add a step' trigger='hover'>
					<Button
						style={{
							fontSize: '16px',
							cursor: 'pointer',
							background: 'transparent',
							border: hoveredAdd ? undefined : 'none',
						}}
						icon={<PlusOutlined />}
						onClick={onClickAddStep}
						onMouseEnter={() => setHoveredAdd(true)} // Hover только для этой кнопки
						onMouseLeave={() => setHoveredAdd(false)}
					/>
				</Tooltip>
				<Tooltip title='View steps' trigger='hover'>
					<Button
						style={{
							fontSize: '16px',
							cursor: 'pointer',
							background: 'transparent',
							border: hoveredView ? undefined : 'none',
						}}
						icon={<ProfileOutlined />}
						onClick={(e) => onClickViewSteps(e, item.getId())}
						onMouseEnter={() => setHoveredView(true)} // Hover только для этой кнопки
						onMouseLeave={() => setHoveredView(false)}
					/>
				</Tooltip>
				<ThemeOptions />
			</div>

			{isExpanded && (
				<StepsList
					key={reloadList ? 'reload' : 'no-reload'}
					goalId={item.getId()}
					onItemSelected={() => console.log()}
					onListOrderChange={() => console.log()}
				/>
			)}
		</div>
	);
};

export default GoalListItem;
