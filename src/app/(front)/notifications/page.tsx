import DynamicNavBar from '@/components/common/DynamicNavBar';
import UserAvatar from '@/components/common/UserAvatar';
import { getNotifications } from '@/lib/serverMethods';
import { formatDate } from '@/lib/utils';

async function Notifications() {
  const notifications: Array<NotificationType> | [] = await getNotifications();
  return (
    <div>
      <DynamicNavBar title="Notifications" />

      {notifications && notifications.length < 1 && <h1 className="text-center font-bold">No Notification found !</h1>}
      {notifications &&
        notifications.length > 0 &&
        notifications.map((item) => (
          <div key={item.id} className="mt-5">
            <div className="flex items-start space-x-4">
              <UserAvatar name={item.user.name} />
              <div className="bg-muted w-full rounded-lg p-4">
                <div className="flex justify-between items-start w-full">
                  <p className="font-bold">{item.user.name}</p>
                  <div className="flex">
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>

                <div>{item.content}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Notifications;
