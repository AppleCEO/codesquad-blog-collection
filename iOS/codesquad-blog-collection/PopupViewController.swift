//
//  PopupViewController.swift
//  codesquad-blog-collection
//
//  Created by joon-ho kil on 9/8/19.
//  Copyright © 2019 길준호. All rights reserved.
//

import UIKit

class PopupViewController: UIViewController, UIGestureRecognizerDelegate {
    var superView: ViewController!
    @IBOutlet weak var popupView: UIView!
    
    @IBOutlet var authorTextField: UITextField!
    @IBOutlet var titleTextField: UITextField!
    @IBOutlet var descriptionTextField: UITextField!
    @IBOutlet var categoryTextField: UITextField!
    @IBOutlet var addressTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
    @IBAction func dismissModal() {
        self.dismiss(animated: false, completion: nil)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let destination = segue.destination as! PickerViewController
        destination.superView = self
    }
    
    var tap: UITapGestureRecognizer!
    override func viewDidAppear(_ animated: Bool) {
        
        tap = UITapGestureRecognizer(target: self, action: #selector(onTap(sender:)))
        tap.numberOfTapsRequired = 1
        tap.numberOfTouchesRequired = 1
        tap.cancelsTouchesInView = false
        tap.delegate = self
        self.view.window?.addGestureRecognizer(tap)
    }
    
    internal func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        return true
    }
    
    internal func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldReceive touch: UITouch) -> Bool {
        view.endEditing(true)
        
        let location = touch.location(in: popupView)
        
        if popupView.point(inside: location, with: nil) {
            return false
        }
        else {
            return true
        }
    }
    
    @objc private func onTap(sender: UITapGestureRecognizer) {
        self.view.window?.removeGestureRecognizer(sender)
        self.dismiss(animated: false, completion: nil)

    }
    @IBAction func register(_ sender: Any) {
        guard verifyInput() else {
            return
        }
        let postModel = PostModel(author: authorTextField.text, title: titleTextField.text!, description: descriptionTextField.text, category: categoryTextField.text!, url: addressTextField.text!)
        
        do {
            try sendPostRequest(model: postModel)
        } catch {
            showError(message: "등록에 실패했습니다. 코드스쿼드 도미닉에게 문의해주세요.")
        }
    }
    
    private func sendPostRequest(model: PostModel) throws {
        dump(model)
        let data = try JSONEncoder().encode(model)
        let urlString = "http://link.codesquad.co.kr/v1/link"
        let url = URL(string: urlString)
        let session = URLSession.shared
        var request = URLRequest(url: url!)
        request.httpMethod = "POST"
        request.addValue("dauqsedoc", forHTTPHeaderField: "x-access-token")
        request.httpBody = data
        request.addValue("application/json", forHTTPHeaderField:"Content-Type")
        
        let task = session.dataTask(with: request, completionHandler: { (data, response, error) -> Void in
            guard let data = data, error == nil else {
                print(error?.localizedDescription ?? "No data")
                self.showError(message: "등록에 실패했습니다. 코드스쿼드 도미닉에게 문의해주세요.")
                return
            }
            let responseJSON = try? JSONSerialization.jsonObject(with: data, options: [])
            if let responseJSON = responseJSON as? [String: Any] {
                let result = responseJSON.first?.value as! String
                if result == "Link Created!" {
                    DispatchQueue.main.sync {
                        self.dismiss(animated: true, completion: nil)
                    return
                    }
                }
            }
            self.showError(message: "등록에 실패했습니다. 코드스쿼드 도미닉에게 문의해주세요.")
        })
        task.resume()
    }
    
    private func verifyInput() -> Bool {
        if titleTextField.text == "" {
            showError(message: "제목을 입력해주세요.")
            return false
        }
        if categoryTextField.text == "" {
            showError(message: "카테고리를 선택해주세요.")
            return false
        }
        if addressTextField.text == "" {
            showError(message: "url을 입력해주세요.")
            return false
        }
        
        return true
    }
    
    private func showError(message: String) {
        let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        
        alert.addAction(UIAlertAction(title: "확인", style: .default, handler: nil))
        self.present(alert, animated: true, completion: nil)
    }
}

