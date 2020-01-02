//
//  postModel.swift
//  codesquad-blog-collection
//
//  Created by joon-ho kil on 2020/01/01.
//  Copyright © 2020 길준호. All rights reserved.
//

import Foundation

struct PostModel: Codable {
    let author: String?
    let title: String
    let description: String?
    let category: String
    let url: String
}
