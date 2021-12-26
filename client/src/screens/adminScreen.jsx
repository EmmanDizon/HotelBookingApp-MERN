import {
  Bookings,
  Rooms,
  Users,
  AddRooms,
} from "../components/admin_section/functions";
import { Tabs } from "antd";
const { TabPane } = Tabs;

function AdminScreen() {
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h1 className="text-center">
        <b>Admin Panel</b>
      </h1>
      <Tabs style={{ marginTop: 50 }} defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <AddRooms />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;
