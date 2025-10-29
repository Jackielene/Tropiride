import Auth from './Auth'
import TropirideProfileController from './TropirideProfileController'
import RideRequestController from './RideRequestController'
import AdminDashboardController from './AdminDashboardController'
import Settings from './Settings'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
TropirideProfileController: Object.assign(TropirideProfileController, TropirideProfileController),
RideRequestController: Object.assign(RideRequestController, RideRequestController),
AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers