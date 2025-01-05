

type User = {
    friends?: string[];  // Array of friend userIds
    sendRequests?: string[]; // Array of userIds for whom the user has sent friend requests
    getRequests?: string[]; // Array of userIds for whom the user has received friend requests
  };

  type Relation="Friends" | "Request Sent" | "Request Received" | "No Relationship"
 
export function getRelationshipStatus(currentUserId: string, targetUser: User): Relation {
  // if(!targetUser) return 'No user'
    // Check if already friends
    if (targetUser?.friends?.includes(currentUserId)) {
      return 'Friends';
    }
  
    // Check if the current user has sent a friend request to the target user
    if (targetUser?.sendRequests?.includes(currentUserId)) {
      return 'Request Sent';
    }
  
    // Check if the current user has received a friend request from the target user
    if (targetUser?.getRequests?.includes(currentUserId)) {
      return 'Request Received';
    }
  
    // No relationship exists
    return 'No Relationship';
  }