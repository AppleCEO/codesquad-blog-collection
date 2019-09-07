//
//  BlogList.swift
//  codesquad-blog-collection
//
//  Created by joon-ho kil on 8/15/19.
//  Copyright © 2019 길준호. All rights reserved.
//

import Foundation

// MARK: - Empty
struct BlogPosts: Codable {
    let links: Links
    let categories: [String]
}

// MARK: - Links
struct Links: Codable {
    let docs: [Doc]
    let totalDocs, limit: Int
    let hasPrevPage, hasNextPage: Bool
    let page, totalPages, pagingCounter: Int
    let prevPage: Int?
    let nextPage: Int?
}

// MARK: - Doc
struct Doc: Codable {
    let id: String
    let author: String
    let title: String
    let docDescription: String
    let category: String
    let url: String
    let metadata: String?
    let v: Int
    
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case author, title
        case docDescription = "description"
        case category, url, metadata
        case v = "__v"
    }
}

// MARK: - MetaData
struct MetaData: Codable {
    let type: String?
    let url: String?
    let siteName, title, purpleDescription: String?
    let image: Image?
    let regDate: String?
    
    enum CodingKeys: String, CodingKey {
        case type, url
        case siteName = "site_name"
        case title
        case purpleDescription = "description"
        case image, regDate
    }
}

// MARK: - Image
struct Image: Codable {
    let url: String
}
