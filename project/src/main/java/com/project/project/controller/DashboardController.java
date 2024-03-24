package com.project.project.controller;

import com.project.project.dto.BookingsDTO;
import com.project.project.dto.ReservationDTO;
import com.project.project.entity.Booking;
import com.project.project.entity.BusData;
import com.project.project.entity.User;
import com.project.project.mapper.ObjectCreationHelper;
import com.project.project.repository.BookingsRepository;
import com.project.project.repository.BusDataRepository;
import com.project.project.repository.UserRepository;
import com.project.project.services.DefaultUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin("*")
@Controller
@RequestMapping("/dashboard")
public class DashboardController {
    private DefaultUserService userService;
    public DashboardController(DefaultUserService userService){
        super();
        this.userService=userService;

    }
    @Autowired
    BookingsRepository bookingsRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BusDataRepository busDataRepository;
    @ModelAttribute("reservation")
    public ReservationDTO reservationDTO(){
        return new ReservationDTO();

    }
    @GetMapping
    public  String displayDashboard(Model model){
        String user = returnUsername();
        model.addAttribute("userDetails",user);
        return "dashboard";
    }
    @PostMapping
    public String filterBusData(@ModelAttribute("reservation") ReservationDTO reservationDTO ,Model model){
        List<BusData> busData = busDataRepository.findByToFromAndDate(reservationDTO.getTo(),
                reservationDTO.getFrom(),
                reservationDTO.getFilterDate());
        if(busData.isEmpty()) {
            busData = null;
        }
        String user = returnUsername();
        model.addAttribute("userDetails", user);

        model.addAttribute("busData",busData);
        model.addAttribute("reservation", reservationDTO);
        return "dashboard";
    }
    @GetMapping("/book/{id}")
    public String bookPage(@PathVariable int id, Model model){
        Optional<BusData> busdata = busDataRepository.findById(id);
        BookingsDTO bks = ObjectCreationHelper.createBookingDto(busdata.get());

        String user = returnUsername();
        model.addAttribute("userDetails", user);

        model.addAttribute("record", bks);
        return "book";

    }
    @PostMapping("/booking")
    public String finalBooking(@ModelAttribute("record") BookingsDTO bookingsDTO,Model model){
        SecurityContext securityContext = SecurityContextHolder.getContext();
        UserDetails user = (UserDetails) securityContext.getAuthentication().getPrincipal();
        Booking b = userService.updateBooking(bookingsDTO,user);
        model.addAttribute("record", new BookingsDTO());
        return "redirect:/myBooking";
    }
    private String returnUsername() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        UserDetails user = (UserDetails) securityContext.getAuthentication().getPrincipal();
        User users = userRepository.findByEmail(user.getUsername());
        return users.getName();
    }

}


