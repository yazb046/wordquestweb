import { Layout } from "antd";

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#FFFFFF',
  flex: 1,
  marginRight: 48,
  width: '100%',
};
  


const AppContent: React.FC = () => {
  return(<Layout.Content style={contentStyle}>Content</Layout.Content>)   
}

export default AppContent