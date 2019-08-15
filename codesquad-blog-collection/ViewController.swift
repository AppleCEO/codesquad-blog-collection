//
//  ViewController.swift
//  codesquad-blog-collection
//
//  Created by joon-ho kil on 8/15/19.
//  Copyright © 2019 길준호. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, UITabBarDelegate {
    var posts: BlogPosts?
    var serverURL = "http://192.168.1.205:3000/v1?category=all"
    
    @IBOutlet weak var blogPostsTableView: UITableView!
    
    @IBOutlet weak var tabBar: UITabBar!
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return posts?.links.totalPages ?? 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        let url = URL(string: serverURL+"&page=\(section+1)")!
        
        do {
            let jsonString = try String(contentsOf: url)
            
            let jsonData = jsonString.data(using: .utf8)!
            posts = try! JSONDecoder().decode(BlogPosts.self, from: jsonData)
        } catch {
            print("error")
        }
        
        return posts?.links.docs.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let url = URL(string: serverURL+"&page=\(indexPath.section+1)")!
        
        do {
            let jsonString = try String(contentsOf: url)
            
            let jsonData = jsonString.data(using: .utf8)!
            posts = try! JSONDecoder().decode(BlogPosts.self, from: jsonData)
        } catch {
            print("error")
        }
        
        let currentRowOfList = posts?.links.docs[indexPath.row]
        
        if let url = URL(string: currentRowOfList?.url ?? "www.apple.com") {
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
        }
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let url = URL(string: serverURL+"&page=\(indexPath.section+1)")!
        
        do {
            let jsonString = try String(contentsOf: url)
            
            let jsonData = jsonString.data(using: .utf8)!
            posts = try! JSONDecoder().decode(BlogPosts.self, from: jsonData)
        } catch {
            print("error")
        }
        
        let cell =
            tableView.dequeueReusableCell(
                withIdentifier: "Cell",
                for: indexPath
        )
        
        cell.imageView?.image = nil
        
        let currentRowOfList = posts?.links.docs[indexPath.row]
        
        cell.textLabel?.text = currentRowOfList?.title
        cell.detailTextLabel?.text = currentRowOfList?.docDescription
       
        if let jsonString = currentRowOfList?.metadata {
            do {
                let jsonData = jsonString.data(using: .utf8)!
                let metaData = try! JSONDecoder().decode(MetaData.self, from: jsonData)
                if let image = loadImage(from: metaData.image?.url ?? "") {
                    cell.imageView?.image = image
                    
                    cell.imageView?.layer.borderColor = UIColor.green.cgColor
                    cell.imageView?.layer.borderWidth = 1.0
                
                }
            } catch {
                print("error")
            }
        }
        
        return cell
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tabBar.selectedItem = tabBar.items?.first
        blogPostsTableView.delegate = self
        blogPostsTableView.dataSource = self
        tabBar.delegate = self
        
        let url = URL(string: serverURL)!
        
        do {
            let jsonString = try String(contentsOf: url)
            
            let jsonData = jsonString.data(using: .utf8)!
            posts = try! JSONDecoder().decode(BlogPosts.self, from: jsonData)
            
        } catch {
            print("error")
        }
    }
    
    func tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem) {
        switch item.tag {
        case 1:
            serverURL = "http://192.168.1.205:3000/v1?category=iOS"
        case 2:
            serverURL = "http://192.168.1.205:3000/v1?category=swift"
        case 3:
            serverURL = "http://192.168.1.205:3000/v1?category=backend"
        case 4:
            serverURL = "http://192.168.1.205:3000/v1?category=frontend"
        default:
            serverURL = "http://192.168.1.205:3000/v1?category=all"
        }
        
        let url = URL(string: serverURL)!
        
        do {
            let jsonString = try String(contentsOf: url)
            
            let jsonData = jsonString.data(using: .utf8)!
            posts = try! JSONDecoder().decode(BlogPosts.self, from: jsonData)
        } catch {
            print("error")
        }
        
        blogPostsTableView.reloadData()
    }
    
    private func convertToDictionary(text: String) -> [String: Any]? {
        if let data = text.data(using: .utf8) {
            do {
                return try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
            } catch {
                print(error.localizedDescription)
            }
        }
        return nil
    }
    
    private func loadImage(from imageUrl: String) -> UIImage? {
        guard let url = URL(string: imageUrl) else { return nil }
        guard let data = try? Data(contentsOf: url) else { return nil }
        
        let image = UIImage(data: data)
        
        return image
    }
}

