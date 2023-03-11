/**
 * Created by sergey on 16.05.16.
 */

/*

// article

// _design/dev_article

// createdAt

function (doc, meta) {
    if (meta.type == "json" && doc.createdAt) {
        // Check if doc is JSON
        emit(doc.createdAt, {'title': doc.title, 'cover': doc.cover, 'date': doc.date});
    } else {
        // do something with binary value
    }
}

// getArticleDraft

function (doc, meta) {
    if (meta.type == "json" && doc.type == "articleDraft" && doc.status == "draft") {
        // Check if doc is JSON
        emit(doc.date, {'title': doc.title, 'cover': doc.cover, 'date': doc.date});
    } else {getArticleDraft
        // do something with binary value
    }
}


// getTrash

function (doc, meta) {
    if (meta.type == "json" && doc.type == "draft") {
        // Check if doc is JSON
        emit(doc.date, {'title': doc.title, 'cover': doc.cover, 'date': doc.date});
    } else {
        // do something with binary value
    }
}


// getTrashUserName

function (doc, meta) {
    if (meta.type == "json" && doc.userName) {
        // Check if doc is JSON
        emit(doc.date, {'article': doc.article,
            'date': doc.date,
            'userName': doc.userName});
    } else {
        // do something with binary value
    }
}



// getTrashWithOutCreatedAt

function (doc, meta) {
    if (meta.type == "json" && !doc.createdAt) {
        // Check if doc is JSON
        emit(doc.date, {
            'title': doc.title,
            'cover': doc.cover,
            'date': doc.date});
    } else {
        // do something with binary value
    }
}


// _design/dev_article_by_date


// article_by_date

function (doc, meta) {
    if (meta.type == "json" && doc.title && doc.date) {
        // Check if doc is JSON
        emit(doc.date, doc.title);
    } else {
        // do something with binary value
    }
}


// date_article_title

function (doc, meta) {
    if (meta.type == "json"
        && doc.title
        && doc.date
        && doc.type == "article"
        && doc.status == "published") {
        // Check if doc is JSON
        emit(doc.date, {
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'title': doc.title,
            'userDisplayName': doc.userDisplayName,
            'cover': doc.cover,
            'date': doc.date,
            'tags': doc.tags
        });
    } else {
        // do something with binary value
    }
}


// userid_article_title

function (doc, meta) {
    if (meta.type == "json"
        && doc.type == "article"
        && doc.status == "published"
        && doc.title
        && doc.userId) {
        // Check if doc is JSON
        emit(doc.userId, {'title': doc.title, 'username': doc.userName, 'cover': doc.cover, 'date': doc.date});
    } else {
        // do something with binary value
    }
}

// _design/dev_shareVideo

// shareVideoDraft

function (doc, meta) {
    if (meta.type == "json" && doc.type == "shareVideoDraft" && doc.status == "draft") {
        // Check if doc is JSON
        emit(doc.updatedAt, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'listId': doc.listId,
            'tags': doc.tags
        });
    } else {
        // do something with binary value
    }
}


//================================================================================

// file


// _design/dev_deletedFile

// deletedFile

function (doc, meta) {
    if (meta.type == "json" && doc.type && doc.type == "deletedFile") {
        // Check if doc is JSON
        emit(doc.type);
    } else {
        // do something with binary value
    }
}


// _design/dev_deletedFileActivity


// deletedFileActivity

function (doc, meta) {
    if (meta.type == "json" && doc.type && doc.type == "deletedFileActivity") {
        // Check if doc is JSON
        emit(doc.type);
    } else {
        // do something with binary value
    }
}


// _design/dev_file


// countShow

function (doc, meta) {
    if (meta.type == "json" && doc.type == "file" && doc.listId) {
        // Check if doc is JSON
        emit(doc.countShow, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'listId': doc.listId,
            'countShow': doc.countShow
        });
    } else {
        // do something with binary value
    }
}


// file

function (doc, meta) {
    if (meta.type == "json" && doc.type == "file") {
        // Check if doc is JSON
        emit(doc.file, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'countShow': doc.countShow,
            'listId': doc.listId,
            'videoDuration': doc.videoDuration
        });
    } else {
        // do something with binary value
    }
}


// getShare

function (doc, meta) {
    if (meta.type == "json" && doc.type == "file" && doc.listId) {
        // Check if doc is JSON
        emit(doc.createdAt, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'videoDuration': doc.videoDuration,
            'listId': doc.listId
        });
    } else {
        // do something with binary value
    }
}


// getShareByOwnerId

function (doc, meta) {
    if (meta.type == "json" && doc.type == "file" && doc.listId) {
        // Check if doc is JSON
        emit(doc.ownerId, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'listId': doc.listId
        });
    } else {
        // do something with binary value
    }
}


// ownerId

function (doc, meta) {
    if (meta.type == "json" && doc.type == "file") {
        // Check if doc is JSON
        emit(doc.ownerId, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'videoDuration': doc.videoDuration
        });
    } else {
        // do something with binary value
    }
}


// myFileOwnerId

function (doc, meta) {
    if (meta.type == "json" && doc.type == "file") {
        // Check if doc is JSON
        emit([doc.ownerId, doc.createdAt], {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'videoDuration': doc.videoDuration
        });
    } else {
        // do something with binary value
    }
}

// spring

function (doc, meta) {
    if (meta.type == "json" && doc.type == "file" && doc.listId) {
        // Check if doc is JSON
        emit(doc.ownerId, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message
        });
    } else {
        // do something with binary value
    }
}


// _design/dev_fileActivity

// createdAt

function (doc, meta) {
    if (meta.type == "json" && doc.createdAt && doc.type == "fileActivity") {
        // Check if doc is JSON
        emit(doc.createdAt, {
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'fromUserName': doc.fromUserName,
            'toUserName': doc.toUserName,
            'read': doc.read
        });
    } else {
        // do something with binary value
    }
}


// fileActivity

function (doc, meta) {
    if (meta.type == "json" && doc.type && doc.type == "fileActivity") {
        // Check if doc is JSON
        emit(doc.type);
    } else {
        // do something with binary value
    }
}


// fromUserId

function (doc, meta) {
    if (meta.type == "json" && doc.type == "fileActivity") {
        // Check if doc is JSON
        emit([doc.fromUserId, doc.createdAt], {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'fromUserName': doc.fromUserName,
            'toUserName': doc.toUserName,
            'videoDuration': doc.videoDuration,
            'read': doc.read
        });
    } else {
        // do something with binary value
    }
}


// toUserId

function (doc, meta) {
    if (meta.type == "json" && doc.type == "fileActivity") {
        // Check if doc is JSON
        emit([doc.toUserId, doc.createdAt], {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'fromUserName': doc.fromUserName,
            'toUserName': doc.toUserName,
            'videoDuration': doc.videoDuration,
            'read': doc.read
        });
    } else {
        // do something with binary value
    }
}


// toUserIdWithCreatedAt

function (doc, meta) {
    if (meta.type == "json" && doc.type == "fileActivity") {
        // Check if doc is JSON
        emit([doc.toUserId, doc.createdAt], {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'fromUserName': doc.fromUserName,
            'toUserName': doc.toUserName,
            'read': doc.read
        });
    } else {
        // do something with binary value
    }
}

// _design/dev_fileCountShow


// _design/dev_fileCouple


// fileCouple

function (doc, meta) {
    if (meta.type == "json" && doc.type && doc.type == "fileCouple") {
        // Check if doc is JSON
        emit(doc.type);
    } else {
        // do something with binary value
    }
}


// _design/dev_fileShow


// fileShow

function (doc, meta) {
    if (meta.type == "json" && doc.type && doc.type == "fileShow") {
        // Check if doc is JSON
        emit(doc.type);
    } else {
        // do something with binary value
    }
}

//================================================================================

// properties


// _design/dev_contactDirectory

// contactDirectory

function (doc, meta) {
    if (meta.type == "json" && doc.type == "contactDirectory") {
        // Check if doc is JSON
        emit(doc.ownerId, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'userEmail': doc.userEmail
        });
    } else {
        // do something with binary value
    }
}


// contactId

function (doc, meta) {
    if (meta.type == "json" && doc.type == "contactDirectory") {
        // Check if doc is JSON
        emit([doc.ownerId, doc.userEmail], {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'userEmail': doc.userEmail
        });
    } else {
        // do something with binary value
    }
}


// _design/dev_list

// list

function (doc, meta) {
    if (meta.type == "json" && doc.type == "list") {
        // Check if doc is JSON
        emit(doc.docId, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'list': doc.list,
            'ownerId': doc.ownerId
        });
    } else {
        // do something with binary value
    }
}


// listId

function (doc, meta) {
    if (meta.type == "json" && doc.type == "list") {
        // Check if doc is JSON
        emit([doc.ownerId, doc.list], {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'list': doc.list
        });
    } else {
        // do something with binary value
    }
}


// ownerId

function (doc, meta) {
    if (meta.type == "json" && doc.type == "list") {
        // Check if doc is JSON
        emit(doc.ownerId, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'ownerId': doc.ownerId,
            'list': doc.list
        });
    } else {
        // do something with binary value
    }
}


// ================================================================================

// user

// _design/dev_user

// createdAt

function (doc, meta) {
    if (meta.type == "json" && doc.createdAt && doc.type == "user") {
        // Check if doc is JSON
        emit(doc.createdAt, {
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'userEmail': doc.userEmail,
            'userDisplayName': doc.userDisplayName,
            'userFirstName': doc.userFirstName,
            'userLastName': doc.userLastName,
            'userLink': doc.userLink,
            'userGender': doc.userGender,
            'userPicture': doc.userPicture,
            'spring': doc.spring,
            'facebook': doc.facebook,
            'google': doc.google,
            'microsoft': doc.microsoft
        });
    } else {
        // do something with binary value
    }
}


 // docId

function (doc, meta) {
    if (meta.type == "json" && doc.type && doc.type == "user") {
        // Check if doc is JSON
        emit(doc.docId, {
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'userEmail': doc.userEmail,
            'userDisplayName': doc.userDisplayName,
            'userFirstName': doc.userFirstName,
            'userLastName': doc.userLastName,
            'userLink': doc.userLink,
            'userGender': doc.userGender,
            'userPicture': doc.userPicture,
            'spring': doc.spring,
            'userPassword': doc.userPassword,
            'facebook': doc.facebook,
            'google': doc.google,
            'microsoft': doc.microsoft
        });
    } else {
        // do something with binary value
    }
}


// facebook

function (doc, meta) {
    if (meta.type == "json" && doc.type == "user" && doc.facebook) {
        emit(doc.facebook, {
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'userEmail': doc.userEmail,
            'userDisplayName': doc.userDisplayName,
            'userFirstName': doc.userFirstName,
            'userLastName': doc.userLastName,
            'userLink': doc.userLink,
            'userGender': doc.userGender,
            'userPicture': doc.userPicture,
            'spring': doc.spring,
            'facebook': doc.facebook,
            'google': doc.google,
            'microsoft': doc.microsoft
        });
    } else {
        // do something with binary value
    }
}


// google

function (doc, meta) {
    if (meta.type == "json" && doc.type == "user" && doc.google) {
        emit(doc.google, {
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'userEmail': doc.userEmail,
            'userDisplayName': doc.userDisplayName,
            'userFirstName': doc.userFirstName,
            'userLastName': doc.userLastName,
            'userLink': doc.userLink,
            'userGender': doc.userGender,
            'userPicture': doc.userPicture,
            'spring': doc.spring,
            'facebook': doc.facebook,
            'google': doc.google,
            'microsoft': doc.microsoft
        });
    } else {
        // do something with binary value
    }
}


// spring

function (doc, meta) {
    if (meta.type == "json" && doc.type == "user" && doc.spring) {
        emit(doc.spring, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'userEmail': doc.userEmail,
            'userDisplayName': doc.userDisplayName,
            'userFirstName': doc.userFirstName,
            'userLastName': doc.userLastName,
            'userLink': doc.userLink,
            'userGender': doc.userGender,
            'userPicture': doc.userPicture,
            'spring': doc.spring,
            'facebook': doc.facebook,
            'google': doc.google,
            'microsoft': doc.microsoft
        });
    } else {
        // do something with binary value
    }
}


// user

function (doc, meta) {
    if (meta.type == "json" && doc.type && doc.type == "user") {
        // Check if doc is JSON
        emit(doc.type, {
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'userEmail': doc.userEmail,
            'userDisplayName': doc.userDisplayName,
            'userFirstName': doc.userFirstName,
            'userLastName': doc.userLastName,
            'userLink': doc.userLink,
            'userGender': doc.userGender,
            'userPicture': doc.userPicture,
            'spring': doc.spring,
            'facebook': doc.facebook,
            'google': doc.google,
            'microsoft': doc.microsoft
        });
    } else {
        // do something with binary value
    }
}

// userInfo

function (doc, meta) {
    if (meta.type == "json" && doc.type && doc.type == "user") {
        // Check if doc is JSON
        emit(doc.docId, {
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'userEmail': doc.userEmail,
            'userDisplayName': doc.userDisplayName,
            'userFirstName': doc.userFirstName,
            'userLastName': doc.userLastName,
            'userLink': doc.userLink,
            'userGender': doc.userGender,
            'userPicture': doc.userPicture,
            'spring': doc.spring,
            'facebook': doc.facebook,
            'google': doc.google,
            'microsoft': doc.microsoft
        });
    } else {
        // do something with binary value
    }
}


// ================================================================================

// logs

// _design/dev_log

// createdAt

function (doc, meta) {
    if (meta.type == "json" && doc.createdAt) {
        emit(doc.createdAt, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'type': doc.type,
            'message': doc.message,
            'val': doc.val,
            'file': doc.file,
            'class': doc.class,
            'funct': doc.funct,
            'request': doc.request,
            'ip': doc.ip
        });
    } else {
        // do something with binary value
    }
}

// getInfo

function (doc, meta) {
    if (meta.type == "json" && doc.type && doc.type == "info") {
        emit(doc.createdAt, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'type': doc.type,
            'message': doc.message,
            'val': doc.val,
            'file': doc.file,
            'class': doc.class,
            'funct': doc.funct,
            'request': doc.request,
            'ip': doc.ip
        });
    } else {
        // do something with binary value
    }
}



//================================================================================

// stack

// _design/dev_stack


// createdAt

function (doc, meta) {
    if (meta.type == "json" && doc.createdAt) {
        emit(doc.createdAt, {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'type': doc.type,
            'message': doc.message,
            'val': doc.val,
            'file': doc.file,
            'class': doc.class,
            'funct': doc.funct,
            'request': doc.request,
            'ip': doc.ip
        });
    } else {
        // do something with binary value
    }
}



//=========================================
// schedule

// myTaskOwnerId


function (doc, meta) {
    if (meta.type == "json" && doc.createdAt) {
        emit([doc.ownerId, doc.createdAt], {
            'docId': doc.docId,
            'createdAt': doc.createdAt,
            'updatedAt': doc.updatedAt,
            'type': doc.type,
            'status': doc.status,
            'attempt': doc.attempt,
            'fileSizeStart': doc.fileSizeStart,
            'fileSizeDone': doc.fileSizeDone,
            'file': doc.file,
            'subject': doc.subject,
            'message': doc.message,
            'ownerId': doc.ownerId,
            'videoDuration': doc.videoDuration,
            'listId': doc.listId
        });
    } else {
        // do something with binary value
    }
}

*/