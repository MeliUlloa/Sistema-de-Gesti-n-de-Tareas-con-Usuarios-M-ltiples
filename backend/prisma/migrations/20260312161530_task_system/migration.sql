-- Add unique constraint to TaskUser
ALTER TABLE `TaskUser` ADD UNIQUE KEY `TaskUser_userId_taskId_key`(`userId`, `taskId`);
