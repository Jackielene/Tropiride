import Auth from './Auth'
import TropirideProfileController from './TropirideProfileController'
import ChatController from './ChatController'
import RideRequestController from './RideRequestController'
import AdminDashboardController from './AdminDashboardController'
import VerificationController from './VerificationController'
import DriverDashboardController from './DriverDashboardController'
import DriverProfileController from './DriverProfileController'
import Settings from './Settings'
import Driver from './Driver'
import Admin from './Admin'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
TropirideProfileController: Object.assign(TropirideProfileController, TropirideProfileController),
ChatController: Object.assign(ChatController, ChatController),
RideRequestController: Object.assign(RideRequestController, RideRequestController),
AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
VerificationController: Object.assign(VerificationController, VerificationController),
DriverDashboardController: Object.assign(DriverDashboardController, DriverDashboardController),
DriverProfileController: Object.assign(DriverProfileController, DriverProfileController),
Settings: Object.assign(Settings, Settings),
Driver: Object.assign(Driver, Driver),
Admin: Object.assign(Admin, Admin),
}

export default Controllers