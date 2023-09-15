import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({
  items,
  isLoading,
  search,
  setSearch,
  onClickInvite,
  invites,
  onClickSendInvites,
}) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          type={search}
          placeholder="Найти пользователя..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter(
              (user) =>
                (user.first_name + user.last_name).toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()),
            )
            .map((user) => (
              <User
                user={user}
                key={user.id}
                isInvites={invites.includes(user.id)}
                onClickInvite={onClickInvite}
              />
            ))}
        </ul>
      )}
      {invites.length > 0 && (
        <button onClick={() => onClickSendInvites()} className="send-invite-btn">
          Отправить приглашение
        </button>
      )}
    </>
  );
};
