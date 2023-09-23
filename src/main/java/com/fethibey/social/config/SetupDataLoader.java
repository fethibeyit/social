package com.fethibey.social.config;

import com.fethibey.social.entity.AppRole;
import com.fethibey.social.entity.AppUser;
import com.fethibey.social.enums.SocialProvider;
import com.fethibey.social.repository.AppRoleRepository;
import com.fethibey.social.repository.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.Set;

@Component
@AllArgsConstructor
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

	private static boolean alreadySetup = false;
	private AppUserRepository userRepository;
	private AppRoleRepository roleRepository;
	private PasswordEncoder passwordEncoder;

	@Override
	@Transactional
	public void onApplicationEvent(final ContextRefreshedEvent event) {
		if (alreadySetup) {
			return;
		}
		// Create initial roles
		AppRole userRole = createRoleIfNotFound(AppRole.ROLE_USER);
		AppRole adminRole = createRoleIfNotFound(AppRole.ROLE_ADMIN);
		AppRole modRole = createRoleIfNotFound(AppRole.ROLE_MODERATOR);
		createUserIfNotFound("admin@javachinna.com", Set.of(userRole, adminRole, modRole));
		alreadySetup = true;
	}

	@Transactional
	public AppUser createUserIfNotFound(final String email, Set<AppRole> roles) {
		AppUser user = userRepository.findByEmail(email);
		if (user == null) {
			user = new AppUser();
			user.setFirstName("Admin");
			user.setEmail(email);
			user.setPassword(passwordEncoder.encode("admin@"));
			user.setRoles(roles);
			user.setProvider(SocialProvider.LOCAL);
//			user.setEnabled(true);
			Date now = Calendar.getInstance().getTime();
//			user.setCreatedDate(now);
//			user.setModifiedDate(now);
			user = userRepository.save(user);
		}
		return user;
	}

	@Transactional
	public AppRole createRoleIfNotFound(final String name) {
		AppRole role = roleRepository.findByName(name);
		if (role == null) {
			role = roleRepository.save(new AppRole(name));
		}
		return role;
	}
}