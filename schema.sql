-- user table

CREATE TABLE "tp_user" 
   (	"id" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	"userName" VARCHAR2(1020 BYTE) NOT NULL ENABLE, 
	"email" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	"phone" NUMBER(10,0), 
	"role" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	"password" VARCHAR2(100 BYTE) NOT NULL ENABLE, 
	"dob" VARCHAR2(36 BYTE), 
	"country" VARCHAR2(36 BYTE), 
	"state" VARCHAR2(36 BYTE), 
	"gender" VARCHAR2(36 BYTE), 
	"isRegistered" NUMBER(1,0) DEFAULT 0, 
	"createdAt" TIMESTAMP (8), 
	"updatedAt" TIMESTAMP (8), 
	"createdBy" VARCHAR2(36 BYTE), 
	"updatedBy" VARCHAR2(36 BYTE), 
	"uuid" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	"isInvited" NUMBER(1,0), 
	"inviteOn" DATE, 
	"inviteLink" VARCHAR2(100 BYTE),
	"login" NUMBER(1,0) DEFAULT 0, 
	"loginUpdatedAt" TIMESTAMP (8), 
	"logout" NUMBER(1,0) DEFAULT 0, 
	"logoutUpdatedAt" TIMESTAMP (8),  
	PRIMARY KEY ("id")
) ;

update  "tp_user" set "isInvited" = '1',"inviteOn" = '28-MAY-24', "isRegistered" = '1' where "email" = 'srinivas-3@gmail.com';

-- image table
CREATE TABLE "tp_image" 
   (	
    "id" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	"profilePicId" VARCHAR2(36 BYTE),
	"profilePicName" VARCHAR2(4000 BYTE),
	"userId" VARCHAR2(36 BYTE) NOT NULL ENABLE,
	"path" CLOB,
	"createdAt" TIMESTAMP (8), 
	"updatedAt" TIMESTAMP (8), 
	"createdBy" VARCHAR2(36 BYTE), 
	"updatedBy" VARCHAR2(36 BYTE), 
	PRIMARY KEY ("id"),
    CONSTRAINT "user_id" FOREIGN KEY ("userId") REFERENCES "tp_user" ("id")
) ;

-- gallery table
CREATE TABLE "tp_gallery" 
   (	
    "id" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	 "imageId" VARCHAR2(36 BYTE),
     "fileName" VARCHAR2(4000 BYTE),
     "userId" VARCHAR2(36 BYTE) NOT NULL ENABLE,
	"createdAt" TIMESTAMP (8), 
	"updatedAt" TIMESTAMP (8), 
	"createdBy" VARCHAR2(36 BYTE), 
	"updatedBy" VARCHAR2(36 BYTE), 
	PRIMARY KEY ("id"),
    CONSTRAINT "user_ID" FOREIGN KEY ("userId") REFERENCES "tp_user" ("id")
) ;

-- follow users
CREATE TABLE "tp_follow_users" 
   (	
	"id" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	"followerId" VARCHAR2(100 BYTE) NOT NULL ENABLE, 
	"followingId" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	"userId" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	"requested" NUMBER(1,0) DEFAULT 0, 
	"isFollow" NUMBER(1,0) DEFAULT 0, 
	"createdAt" TIMESTAMP (8), 
	"updatedAt" TIMESTAMP (8), 
	"createdBy" VARCHAR2(36 BYTE), 
	"updatedBy" VARCHAR2(36 BYTE), 
	 PRIMARY KEY ("id"),
     CONSTRAINT "follow_user_id" FOREIGN KEY ("userId") REFERENCES "tp_user" ("id"),
     CONSTRAINT "follower_id" FOREIGN KEY ("followerId") REFERENCES "tp_user" ("id"),
     CONSTRAINT "following_id" FOREIGN KEY ("followingId") REFERENCES "tp_user" ("id")
	 );

-- notification
CREATE TABLE "tp_notification" 
   (	
    "id" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	 "subject" clob not null ENABLE,
     "notificationFrom" VARCHAR2(36 BYTE) NOT NULL ENABLE,
    "notificationTo" VARCHAR2(36 BYTE) NOT NULL ENABLE,
    "isRead" NUMBER(1,0) DEFAULT 0,
     "userId" VARCHAR2(36 BYTE) NOT NULL ENABLE,
	"createdAt" TIMESTAMP (8), 
	"updatedAt" TIMESTAMP (8), 
	"createdBy" VARCHAR2(36 BYTE), 
	"updatedBy" VARCHAR2(36 BYTE), 
	PRIMARY KEY ("id"),
    CONSTRAINT "notification_user_id" FOREIGN KEY ("userId") REFERENCES "tp_user" ("id")
) ;

-- view notification

  CREATE OR REPLACE  view "tp_view_fetch_notification" AS 
  select 
us."id",
us."userName",
img."profilePicId",
img."profilePicName",
notif."id" "notificationId",
notif."subject",
notif."notificationFrom",
notif."notificationTo",
notif."createdAt"
from "tp_user" us
left join "tp_image" img on img."userId" = us."id"
left join "tp_notification" notif on notif."userId" = us."id" and notif."isRead" = 0
where us."isRegistered" = 1;

--post table

create table "tp_post" (
"id" varchar2(36) not null,
"location" varchar2(1020) not null,
"description" VARCHAR2(4000 BYTE) not null,
"userId" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id"),
foreign key ("userId") references "tp_user" ("id")
);

--post images table

create table "tp_post_images" (
"id" varchar2(36) not null,
"postId" varchar2(36),
"postFileName" varchar2(1020) not null,
"postFieldId" varchar2(36) not null,
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id"),
foreign key("postId") references "tp_post" ("id") ON DELETE CASCADE
);


--post like table

create table "tp_post_like" (
"id" varchar2(36) not null,
"postId" varchar2(36)not null,
"isLike" NUMBER(1,0) default 0,
"userId" varchar2(36) not null,
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id"),
foreign key ("userId") references "tp_user" ("id"),
foreign key("postId") references "tp_post" ("id") ON DELETE CASCADE
);


--post comment table

create table "tp_post_comment" (
"id" varchar2(36) not null,
"postId" varchar2(36) not null,
"comment" VARCHAR2(4000 BYTE) not null,
"userId" varchar2(36) not null,
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id"),
foreign key("postId") references "tp_post" ("id") ON DELETE CASCADE,
foreign key ("userId") references "tp_user" ("id") 
);

-- view posts
 CREATE OR REPLACE  VIEW "tp_view_fetch_posts"  AS 
  SELECT 
    post."id",
    us."userName",
    post."location",
    post."description",
    img."profilePicId",
    img."profilePicName",
    us."id" "userId",
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'postFileName' VALUE imgs."postFileName",
          'postFieldId' VALUE imgs."postFieldId"
            )
        ) AS imgs
        FROM "tp_post_images" imgs 
        WHERE imgs."postId" = post."id"
        GROUP BY imgs."postId"
    ) AS "postImages",
    (select count(plike."id") from "tp_post_like" plike where post."id" = plike."postId" and plike."isLike" = 1) "likesCount",
    (select count(pcomment."id") from "tp_post_comment" pcomment where post."id" = pcomment."postId") "commentsCount"
FROM 
    "tp_post" post
LEFT JOIN 
    "tp_user" us ON us."id" = post."userId"
LEFT JOIN 
    "tp_image" img ON img."userId" = us."id"
WHERE 
    us."isRegistered" = 1 
    AND us."isInvited" = 1 
    AND us."inviteOn" IS NOT NULL;

-- view comments

       CREATE OR REPLACE  view "tp_view_fetch_post_comments" AS 
select 
    pc."id",
    pc."postId",
    us."userName",
    pc."comment",
    img."profilePicId",
    img."profilePicName",
    us."id" "userId",
    pc."createdAt"
from "tp_post_comment" pc
LEFT JOIN 
    "tp_user" us ON us."id" = pc."userId"
LEFT JOIN 
    "tp_image" img ON img."userId" = us."id"
WHERE 
    us."isRegistered" = 1 
    AND us."isInvited" = 1 
    AND us."inviteOn" IS NOT NULL;

-- find post
create table "tp_find_post" (
"id" varchar2(36) not null,
"tripLocation" varchar2(1020) not null,
"tripDate" varchar2(1020) not null,
"tripDescription" VARCHAR2(4000 BYTE) not null,
"userId" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id"),
foreign key ("userId") references "tp_user" ("id")
);

--find post like table

create table "tp_find_post_like" (
"id" varchar2(36) not null,
"findPostId" varchar2(36)not null,
"isLike" NUMBER(1,0) default 0,
"userId" varchar2(36) not null,
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id"),
foreign key ("userId") references "tp_user" ("id"),
foreign key("findPostId") references "tp_find_post" ("id") ON DELETE CASCADE
);

--find post save table
create table "tp_find_post_save" (
"id" varchar2(36) not null,
"findPostId" varchar2(36)not null,
"isSave" NUMBER(1,0) default 0,
"userId" varchar2(36) not null,
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id"),
foreign key ("userId") references "tp_user" ("id"),
foreign key("findPostId") references "tp_find_post" ("id") ON DELETE CASCADE
);


--find post comment table

create table "tp_find_post_comment" (
"id" varchar2(36) not null,
"findPostId" varchar2(36) not null,
"comment" VARCHAR2(4000 BYTE) not null,
"userId" varchar2(36) not null,
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id"),
foreign key("findPostId") references "tp_find_post" ("id") ON DELETE CASCADE,
foreign key ("userId") references "tp_user" ("id") 
);

---chat table
create table "tp_chat" (
"id" varchar2(36) not null,
"sender" varchar2(36) not null,
"receiver" varchar2(36) not null,
"message" varchar2(4000) not null,
"userId" varchar2(36) not null,
"createdAt" TIMESTAMP(8),
"createdBy" varchar2(36),
"updatedAt" TIMESTAMP(8),
"updatedBy" varchar2(36),
primary key("id"),
foreign key ("userId") references "tp_user" ("id")
);


-- create or replace function "tp_function_fetch_find_posts_join"(
--     loc IN VARCHAR2
-- )
-- return "tp_function_fetch_find_posts_table" is findPosts "tp_function_fetch_find_posts_table";

-- BEGIN
-- select "tp_function_fetch_find_posts_data"(
-- "id",
-- "tripLocation",
-- "tripDate",
-- "tripDescription",
-- "userName",
-- "profilePicId",
-- "profilePicName",
-- "likesCount",
-- "commentsCount",
-- "createdAt"
-- )

-- bulk collect into findPosts from(

-- select
-- findPost."id",
-- findPost."tripLocation",
-- findPost."tripDate",
-- findPost."tripDescription",
-- findPost."createdAt",
-- us."userName",
-- img."profilePicId",
-- img."profilePicName",
-- (select count(plike."id") from "tp_find_post_like" plike where findPost."id" = plike."findPostId" and plike."isLike" = 1) "likesCount",
-- (select count(pcomment."id") from "tp_find_post_comment" pcomment where findPost."id" = pcomment."findPostId") "commentsCount"
-- from "tp_find_post" findPost
-- left join "tp_user" us on us."id" = findPost."userId"
-- left join "tp_image" img ON img."userId" = us."id"
-- where findPost."tripLocation" = loc);

-- return findPosts;

-- END;

-- create or replace NONEDITIONABLE type "tp_function_fetch_find_posts_data" as object(
-- "id" VARCHAR2(36),
-- "tripLocation" varchar2(1020),
-- "tripDate" VARCHAR2(1020 BYTE),
-- "tripDescription" VARCHAR2(4000 BYTE),
-- "userName" VARCHAR2(1020),
-- "profilePicId" VARCHAR2(36),
-- "profilePicName" clob,
-- "likesCount" number,
-- "commentsCount" number,
-- "createdAt" TIMESTAMP(8),
-- "requested" NUMBER(1,0),
-- "isFollow" NUMBER(1,0)
-- );

-- create or replace type "tp_function_fetch_find_posts_table" as table of "tp_function_fetch_find_posts_data";

-- to get the find post comments
CREATE OR REPLACE  view "tp_view_fetch_find__post_comments" AS 
select 
    pc."id",
    pc."findPostId",
    us."userName",
    pc."comment",
    img."profilePicId",
    img."profilePicName",
    us."id" "userId",
    pc."createdAt"
from "tp_find_post_comment" pc
LEFT JOIN 
    "tp_user" us ON us."id" = pc."userId"
LEFT JOIN 
    "tp_image" img ON img."userId" = us."id"
WHERE 
    us."isRegistered" = 1 
    AND us."isInvited" = 1 
    AND us."inviteOn" IS NOT NULL;


CREATE OR REPLACE  VIEW "tp_view_fetch_find_post"  AS 

 SELECT 
    findPost."id",
    findPost."tripLocation",
    findPost."tripDate",
    findPost."tripDescription",
    findPost."createdAt",
    findPost."userId",
    us."userName",
    img."profilePicId",
    img."profilePicName",
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'followerId' VALUE followUsers."followerId",
          'followingId' VALUE followUsers."followingId",
          'requested' value NVL(followUsers."requested", 0),
          'isFollow' value  NVL(followUsers."isFollow", 0)
            )
        ) AS followUsers
        FROM "tp_follow_users" followUsers 
        WHERE (followUsers."followerId" = findPost."userId" OR followUsers."followingId" = findPost."userId")
    AND followUsers."requested" = 1
    AND followUsers."isFollow" = 1
    ) AS "followUsers",
    (SELECT COUNT(plike."id") FROM "tp_find_post_like" plike WHERE findPost."id" = plike."findPostId" AND plike."isLike" = 1) AS "likesCount",
    (SELECT COUNT(pcomment."id") FROM "tp_find_post_comment" pcomment WHERE findPost."id" = pcomment."findPostId") AS "commentsCount"
FROM "tp_find_post" findPost
LEFT JOIN "tp_user" us ON us."id" = findPost."userId"
LEFT JOIN "tp_image" img ON img."userId" = us."id"
WHERE 
    us."isRegistered" = 1 
    AND us."isInvited" = 1 
    AND us."inviteOn" IS NOT NULL;

-- view for saved travel posts

CREATE OR REPLACE  VIEW "tp_view_fetch_find_saved_post"  AS 

 SELECT 
    findPost."id",
    findPost."tripLocation",
    findPost."tripDate",
    findPost."tripDescription",
    findPost."createdAt",
    findPost."userId",
    us."userName",
    img."profilePicId",
    img."profilePicName",
    savePost."isSave",
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'followerId' VALUE followUsers."followerId",
          'followingId' VALUE followUsers."followingId",
          'requested' value NVL(followUsers."requested", 0),
          'isFollow' value  NVL(followUsers."isFollow", 0)
            )
        ) AS followUsers
        FROM "tp_follow_users" followUsers 
        WHERE (followUsers."followerId" = findPost."userId" OR followUsers."followingId" = findPost."userId")
    AND followUsers."requested" = 1
    AND followUsers."isFollow" = 1
    ) AS "followUsers",
    (SELECT COUNT(plike."id") FROM "tp_find_post_like" plike WHERE findPost."id" = plike."findPostId" AND plike."isLike" = 1) AS "likesCount",
    (SELECT COUNT(pcomment."id") FROM "tp_find_post_comment" pcomment WHERE findPost."id" = pcomment."findPostId") AS "commentsCount"
FROM "tp_find_post" findPost
LEFT JOIN "tp_user" us ON us."id" = findPost."userId"
LEFT JOIN "tp_image" img ON img."userId" = us."id"
LEFT JOIN "tp_find_post_save" savePost ON savePost."findPostId" = findPost."id" 
WHERE 
    us."isRegistered" = 1 
    AND us."isInvited" = 1 
    AND us."inviteOn" IS NOT NULL and savePost."isSave" = 1;

-- view to fetch the follow users
CREATE OR REPLACE  VIEW "tp_view_fetch_follow_users"  AS 
select 
 userInfo."id",
 userInfo."userName",
    img."profilePicId",
    img."profilePicName",
    followUsers."followerId" ,
    followUsers."followingId",
    followUsers."requested",
    followUsers."isFollow",
    userInfo."login",
    userInfo."logout"
from "tp_user" userInfo
left join "tp_follow_users" followUsers  on (followUsers."followerId" = userInfo."id" OR followUsers."followingId" = userInfo."id")AND followUsers."requested" = 1
    AND followUsers."isFollow" = 1
LEFT JOIN "tp_image" img ON img."userId" = userInfo."id"
WHERE 
    userInfo."isRegistered" = 1 
    AND userInfo."isInvited" = 1 
    AND userInfo."inviteOn" IS NOT NULL;

-- view to fetch the chat users
CREATE OR REPLACE  VIEW "tp_view_fetch_chat"  AS 
select 
 userInfo."id",
 userInfo."userName",
    img."profilePicId",
    img."profilePicName",
    chat."sender",
    chat."receiver",
    chat."userId",
    chat."createdAt",
    userInfo."login",
    userInfo."logout",
    chat."message"
from "tp_user" userInfo
left join "tp_chat" chat  on (chat."sender" = userInfo."id" OR chat."receiver" = userInfo."id")
LEFT JOIN "tp_image" img ON img."userId" = userInfo."id"
WHERE 
    userInfo."isRegistered" = 1 
    AND userInfo."isInvited" = 1 
    AND userInfo."inviteOn" IS NOT NULL;