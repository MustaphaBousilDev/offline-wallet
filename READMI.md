Core Data flow:
---------------

01------------- when user sends money

UI --> TransactionService.sendMoney() --> createLocal transaction 
--> save transaction in MMKV --> update wallet snapshot 
--> create queue item --> save queue item 
--> UI updates immediately

02------------- when internet comes back

network Monitor detects online --> queueManager.process() 
---> queue item locked --> syncEngine.sendTransaction ()
---> success or failure handled 
---> repositories update transaction + queue 
---> UI refreshes

03------------- When app restarts
appInit() --> recovery.recoverProcessingQueueItems()
----> rebuild invalid states if needed
----> start network monitor
----> resume sync when online



Architecture rules you should follow
-> never store money as float
-> queue must be durable
-> transaction and queue are separate
-> use indexed MMKV keys
-> use indexed MMKV keys