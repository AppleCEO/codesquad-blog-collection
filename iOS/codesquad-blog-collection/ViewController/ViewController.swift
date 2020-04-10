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
    var serverURL = "http://13.125.91.246/v1?category=all"
    var index = 0
    
    // floating 버튼 관련 프로퍼티 시작
    private var floatingButton: UIButton?
    private let floatingButtonImageName = "60740"
    private static let buttonHeight: CGFloat = 60.0
    private static let buttonWidth: CGFloat = 60.0
    private let roundValue = ViewController.buttonHeight/2
    private let trailingValue: CGFloat = 15.0
    private let leadingValue: CGFloat = 15.0
    private let shadowRadius: CGFloat = 2.0
    private let shadowOpacity: Float = 0.5
    private let shadowOffset = CGSize(width: 0.0, height: 5.0)
    private let scaleKeyPath = "scale"
    private let animationKeyPath = "transform.scale"
    private let animationDuration: CFTimeInterval = 0.4
    private let animateFromValue: CGFloat = 1.00
    private let animateToValue: CGFloat = 1.05
    // floating 버튼 관련 프로퍼티 끝
    
    @IBOutlet weak var blogPostsTableView: UITableView!
    @IBOutlet weak var tabBar: UITabBar!
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let destination = segue.destination as! ContainerViewController
        destination.url = posts?.links.docs[index].url
    }
    
    // floating 버튼 관련 메소드 시작
    public override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        createFloatingButton()
        floatingButton?.accessibilityIdentifier = "FloatButton"
        blogPostsTableView.reloadData()
    }
    
    public override func viewWillDisappear(_ animated: Bool) {
        guard floatingButton?.superview != nil else {  return }
        DispatchQueue.main.async {
            self.floatingButton?.removeFromSuperview()
            self.floatingButton = nil
        }
        super.viewWillDisappear(animated)
    }
    
    private func createFloatingButton() {
        floatingButton = UIButton(type: .custom)
        floatingButton?.translatesAutoresizingMaskIntoConstraints = false
        floatingButton?.backgroundColor = .blue
        floatingButton?.setImage(UIImage(named: floatingButtonImageName), for: .normal)
        floatingButton?.addTarget(self, action: #selector(doThisWhenButtonIsTapped(_:)), for: .touchUpInside)
        constrainFloatingButtonToWindow()
        makeFloatingButtonRound()
        addShadowToFloatingButton()
        addScaleAnimationToFloatingButton()
    }
    
    // TODO: Add some logic for when the button is tapped.
    @IBAction private func doThisWhenButtonIsTapped(_ sender: Any) {
        let storyBoard = UIStoryboard.init(name: "Main", bundle: nil)
        let popupVC = storyBoard.instantiateViewController(withIdentifier: "PopupViewController") as! PopupViewController
        popupVC.superView = self
        popupVC.modalPresentationStyle = .overCurrentContext
        present(popupVC, animated: false, completion: nil)
    }
    
    private func constrainFloatingButtonToWindow() {
        DispatchQueue.main.async {
            guard let keyWindow = UIApplication.shared.keyWindow,
                let floatingButton = self.floatingButton else { return }
            keyWindow.addSubview(floatingButton)
            keyWindow.trailingAnchor.constraint(equalTo: floatingButton.trailingAnchor,
                                                constant: self.trailingValue).isActive = true
            keyWindow.bottomAnchor.constraint(equalTo: floatingButton.bottomAnchor,
                                              constant: self.leadingValue).isActive = true
            floatingButton.widthAnchor.constraint(equalToConstant:
                ViewController.buttonWidth).isActive = true
            floatingButton.heightAnchor.constraint(equalToConstant:
                ViewController.buttonHeight).isActive = true
        }
    }
    
    private func makeFloatingButtonRound() {
        floatingButton?.layer.cornerRadius = roundValue
    }
    
    private func addShadowToFloatingButton() {
        floatingButton?.layer.shadowColor = UIColor.black.cgColor
        floatingButton?.layer.shadowOffset = shadowOffset
        floatingButton?.layer.masksToBounds = false
        floatingButton?.layer.shadowRadius = shadowRadius
        floatingButton?.layer.shadowOpacity = shadowOpacity
    }
    
    private func addScaleAnimationToFloatingButton() {
        // Add a pulsing animation to draw attention to button:
        DispatchQueue.main.async {
            let scaleAnimation: CABasicAnimation = CABasicAnimation(keyPath: self.animationKeyPath)
            scaleAnimation.duration = self.animationDuration
            scaleAnimation.repeatCount = .greatestFiniteMagnitude
            scaleAnimation.autoreverses = true
            scaleAnimation.fromValue = self.animateFromValue
            scaleAnimation.toValue = self.animateToValue
            self.floatingButton?.layer.add(scaleAnimation, forKey: self.scaleKeyPath)
        }
    }
    // floating 버튼 관련 메소드 끝
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return posts?.links.totalPages ?? 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        let url = URL(string: serverURL+"&page=\(section+1)")!
        loadPosts(url: url)

        return posts?.links.docs.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        index = indexPath.row
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let url = URL(string: serverURL+"&page=\(indexPath.section+1)")!
        
        loadPosts(url: url)
        
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
        
        loadPosts(url: url)
    }
    
    func tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem) {
        switch item.tag {
        case 1:
            serverURL = "http://13.125.91.246/v1?category=iOS"
        case 2:
            serverURL = "http://13.125.91.246/v1?category=swift"
        case 3:
            serverURL = "http://13.125.91.246/v1?category=backend"
        case 4:
            serverURL = "http://13.125.91.246/v1?category=frontend"
        default:
            serverURL = "http://13.125.91.246/v1?category=all"
        }
        
        let url = URL(string: serverURL)!
        
        loadPosts(url: url)
        
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
    
    private func loadPosts(url: URL) {
        let semaphore = DispatchSemaphore(value: 0)
        let session = URLSession.shared
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.addValue("dauqsedoc", forHTTPHeaderField: "x-access-token")
        let task = session.dataTask(with: request, completionHandler: { (data, response, error) -> Void in
            guard let data = data else {
                print("load data failed")
                return
            }
            do {
                self.posts = try JSONDecoder().decode(BlogPosts.self, from: data)
            } catch {
                print(error.localizedDescription)
            }
            semaphore.signal()
        })
        task.resume()
        semaphore.wait()
    }
}

