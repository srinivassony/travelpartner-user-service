-- user table

CREATE TABLE "tp_user" 
   (	"id" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	"userName" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
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

-- image table
CREATE TABLE "tp_image" 
   (	
    "id" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	"profilePicId" VARCHAR2(36 BYTE),
	"profilePicName" CLOB,
	"bgPicId" VARCHAR2(36 BYTE),
	"bgPicName" CLOB,
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
     "fileName" CLOB,
     "userId" VARCHAR2(36 BYTE) NOT NULL ENABLE,
	"createdAt" TIMESTAMP (8), 
	"updatedAt" TIMESTAMP (8), 
	"createdBy" VARCHAR2(36 BYTE), 
	"updatedBy" VARCHAR2(36 BYTE), 
	PRIMARY KEY ("id"),
    CONSTRAINT "user_ID" FOREIGN KEY ("userId") REFERENCES "tp_user" ("id")
) ;

-- find a partner
CREATE TABLE "tp_findAPartner" 
   (	
    "id" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
	 "location" VARCHAR2(100 BYTE) not null,
     "tripDate" VARCHAR2(36 BYTE) NOT NULL ENABLE,
     "description" CLOB NOT NULL ENABLE,
     "userId" VARCHAR2(36 BYTE) NOT NULL ENABLE,
	"createdAt" TIMESTAMP (8), 
	"updatedAt" TIMESTAMP (8), 
	"createdBy" VARCHAR2(36 BYTE), 
	"updatedBy" VARCHAR2(36 BYTE), 
	PRIMARY KEY ("id"),
    CONSTRAINT "find_user_id" FOREIGN KEY ("userId") REFERENCES "tp_user" ("id")
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

