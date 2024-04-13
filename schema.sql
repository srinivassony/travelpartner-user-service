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