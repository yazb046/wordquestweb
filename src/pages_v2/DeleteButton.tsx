import React from 'react';
import { Dropdown, Menu, Button, Tooltip } from 'antd';
import { EllipsisOutlined,  EditOutlined, DeleteOutlined, FolderOpenFilled } from '@ant-design/icons';

const ThemeOptions: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item key="rename" icon={<EditOutlined />}>
        Переименовать
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        Удалить
      </Menu.Item>
      <Menu.Item key="archive" icon={<FolderOpenFilled />}>
        Архивировать
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Tooltip title="Space settings">
        <Button type="text" icon={<EllipsisOutlined />} />
      </Tooltip>
    </Dropdown>
  );
};

export default ThemeOptions;
